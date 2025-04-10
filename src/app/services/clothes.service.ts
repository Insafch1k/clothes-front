import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { TelegramService } from './telegram.service'
import { Observable } from 'rxjs'
import { API_URL } from '../constants/api-url'

export interface PhotosResponse {
	photos: any[]
	limit: number
	page: number
	total_photos: number
}

@Injectable({
	providedIn: 'root',
})
export class ClothesService {
	private cache = {
		clothes: [] as any[],
		currentPage: 1,
		isFinis: false,
	}

	constructor(
		private http: HttpClient,
		private telegramService: TelegramService
	) {}

	getPhotosPage(page: number): Observable<PhotosResponse> {
		const initData = this.telegramService.getInitDataUnsafe()
		const userId = initData.user?.id || 'a'
		return this.http.get<PhotosResponse>(
			`${API_URL}/clothes/wardrobe/${userId}/Женская одежда/Юбки/Юбки-карандаш`,
			{
				params: { page, limit: 6 },
			}
		)
	}

	getCachedData() {
		return this.cache
	}
}
