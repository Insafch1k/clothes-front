import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { BodyService } from 'src/app/services/body.service'
import { TelegramService } from 'src/app/services/telegram.service'

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
	imageData: string | null = null
	openCategoryBody: boolean = false
	allPhotos: any[] = []
	isFinis: boolean = false
	currentPage: number = 1

	private subscription!: Subscription

	constructor(
		private apiService: ApiService,
		private bodyService: BodyService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.subscription = this.apiService.uploadedPhotoBody$.subscribe(
			(photo) => {
				this.imageData = photo
			}
		)

		const cache = this.bodyService.getCachedData()
		this.allPhotos = cache.profiles
		this.currentPage = cache.currentPage
		this.isFinis = cache.isFinis

		if (!this.isFinis && this.allPhotos.length === 0) {
			this.loadPhotos()
		}
	}

	loadPhotos(): void {
		if (this.isFinis) return

		this.bodyService.getPhotosPage(this.currentPage).subscribe({
			next: (response) => {
				this.allPhotos = [...this.allPhotos, ...response.photos]
				const totalPages = Math.ceil(response.total_photos / response.limit)
				this.currentPage++
				this.isFinis = this.currentPage > totalPages

				this.bodyService.getCachedData().profiles = this.allPhotos
				this.bodyService.getCachedData().currentPage = this.currentPage
				this.bodyService.getCachedData().isFinis = this.isFinis

				if (!this.isFinis) {
					this.loadPhotos()
				}
			},
			error: (err) => console.error('Ошибка:', err),
		})
	}

	ngOnDestroy() {
		this.subscription.unsubscribe()
	}

	toggleCategoryBody() {
		this.openCategoryBody = !this.openCategoryBody
	}

	navigateToCamera(action: string) {
		this.router.navigate(['/gallery'], {
			state: { action },
		})
	}

	onMainPage(image: string) {
		this.imageData = image
	}
}
