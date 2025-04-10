import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CLOTHES_CATEGORIES } from 'src/app/constants/categories'
import { ClothesService } from 'src/app/services/clothes.service'

@Component({
	selector: 'app-mesh-wardrobe',
	templateUrl: './mesh-wardrobe.component.html',
	styleUrls: ['./mesh-wardrobe.component.scss'],
})
export class MeshWardrobeComponent implements OnInit {
	@ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>

	categories = CLOTHES_CATEGORIES
	activateCategory: string | null = null
	activateSubCategory: string | null = null
	activateSubSubCategory: string | null = null

	isActive: boolean = false

	constructor(
		private route: ActivatedRoute,
		private clothesService: ClothesService
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.activateCategory = params['category'] || null
			this.activateSubCategory = params['subcategory'] || null
			this.activateSubSubCategory = params['subsubcategory'] || null

			setTimeout(() => {
				this.scrollToActiveElement()
			}, 100)
		})

		const cache = this.clothesService.getCachedData()
		this.clothes = cache.clothes
		this.currentPage = cache.currentPage
		this.isFinis = cache.isFinis

		if (!this.isFinis && this.clothes.length === 0) {
			this.loadPhotos()
		}
	}

	clothes: any[] = []
	isFinis: boolean = false
	currentPage: number = 1

	loadPhotos(): void {
		if (this.isFinis) return

		this.clothesService.getPhotosPage(this.currentPage).subscribe({
			next: (response) => {
				this.clothes = [...this.clothes, ...response.photos]
				const totalPages = Math.ceil(response.total_photos / response.limit)
				this.currentPage++
				this.isFinis = this.currentPage > totalPages

				this.clothesService.getCachedData().clothes = this.clothes
				this.clothesService.getCachedData().currentPage = this.currentPage
				this.clothesService.getCachedData().isFinis = this.isFinis

				if (!this.isFinis) {
					this.loadPhotos()
				}
			},
			error: (err) => console.error('Ошибка:', err),
		})
	}

	private scrollToActiveElement() {
		const elementId = [
			this.activateCategory,
			this.activateSubCategory,
			this.activateSubSubCategory,
		]
			.filter(Boolean)
			.join('-')
		const element = document.getElementById(elementId)
		const container = this.scrollContainer?.nativeElement

		if (element && container) {
			const elementTop = element.getBoundingClientRect().top + window.scrollY
			const offsetPosition = elementTop - 140

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})

			const elementLeft = element.getBoundingClientRect()
			const containerLeft = container.getBoundingClientRect()
			const scrolloffset = 100

			container.scrollTo({
				left:
					elementLeft.left -
					containerLeft.left +
					container.scrollLeft -
					scrolloffset,
				behavior: 'smooth',
			})

			element.classList.add('active')
		}
	}

	toggleActive(subCategory: {
		name: string
		isSubSubMenuOpen: boolean
		subSubCategories: any
	}) {
		this.categories.forEach((cat) => {
			cat.subCategories.forEach((subCat) => {
				if (subCat !== subCategory) {
					subCat.isSubSubMenuOpen = false
				} else {
					subCat.isSubSubMenuOpen = true
				}
			})
		})
	}

	getSearchParams(category: any, subcategory: any) {
		const params: any = { now: Date.now() }
		if (category.name) params.category = category.name
		if (subcategory.name) params.subcategory = subcategory.name
		return params
	}
}
