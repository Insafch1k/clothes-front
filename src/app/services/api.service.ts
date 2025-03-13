import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { TelegramService } from './telegram.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://your-api-endpoint.com'
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private http: HttpClient,
    private telegramService: TelegramService
  ) { }

  postImageData(imageData: string) {
    const initData = this.telegramService.getInitDataUnsafe()
    const userId = initData.user?.id;

    if(!userId){
      this.error.set('User identefication failed')
      return
    }

    this.loading.set(true);
    this.error.set(null);
    
    const payLoad = {
      image: imageData,
      userId,
    }

    return this.http.post(this.API_URL+'/image', payLoad).pipe(
      catchError(err => {
        this.error.set(err.message || 'Failed to upload image');
        return of(null);
      })
    ).subscribe(() => {
      this.loading.set(false);
    });
  }
  
}
