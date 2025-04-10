import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { TelegramService } from './telegram.service'
import { API_URL } from '../constants/api-url'

const DEFAULT_CACHE = {
	profiles: [] as any[],
	currentPage: 1,
	isFinis: false,
}

export interface PhotosResponse {
	photos: any[]
	limit: number
	page: number
	total_photos: number
}

@Injectable({
	providedIn: 'root',
})
export class BodyService {
	private cache = DEFAULT_CACHE

	constructor(
		private http: HttpClient,
		private telegramService: TelegramService
	) {}

	getPhotosPage(page: number): Observable<PhotosResponse> {
		const initData = this.telegramService.getInitDataUnsafe()
		const userId = initData.user?.id || 'a'
		return this.http.get<PhotosResponse>(
			`${API_URL}/human/user_photos/${userId}`,
			{
				params: { page, limit: 6 },
			}
		)
	}

	getCachedData() {
		return this.cache
	}

	resetCache() {
		this.cache = DEFAULT_CACHE
	}
}
