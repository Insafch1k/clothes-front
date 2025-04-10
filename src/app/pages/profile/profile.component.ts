import { Component, OnInit } from '@angular/core'
import { BodyService } from 'src/app/services/body.service'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	isDeleteOpen: boolean = false

	profiles: any[] = []
	isFinis: boolean = false
	currentPage: number = 1

	constructor(private bodyService: BodyService) {}

	ngOnInit() {
		const cache = this.bodyService.getCachedData()
		this.profiles = cache.profiles
		this.currentPage = cache.currentPage
		this.isFinis = cache.isFinis

		if (!this.isFinis) {
			this.loadPhotos()
		}
	}

	loadPhotos(): void {
		if (this.isFinis) return

		this.bodyService.getPhotosPage(this.currentPage).subscribe({
			next: (response) => {
				this.profiles = [...this.profiles, ...response.photos]
				const totalPages = Math.ceil(response.total_photos / response.limit)
				this.currentPage++
				this.isFinis = this.currentPage > totalPages

				this.bodyService.getCachedData().profiles = this.profiles
				this.bodyService.getCachedData().currentPage = this.currentPage
				this.bodyService.getCachedData().isFinis = this.isFinis

				if (!this.isFinis) {
					this.loadPhotos()
				}
			},
			error: (err) => console.error('Ошибка:', err),
		})
	}

	closeDelete() {
		this.isDeleteOpen = false
	}
}
