import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { TelegramService } from './telegram.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://your-api-endpoint.com'
  type: string | undefined;
  loading = signal(false);
  error = signal<string | null>(null);
  path: string | undefined;

  constructor(
    private http: HttpClient,
    private telegramService: TelegramService
  ) { }

  postImageDataBody(imageData: string){
    this.path = '/body'
    this.type = 'not clothes'
    this.postImageData(imageData);
  }

  postImageDataClothes(imageData: string, nameClothes: string){
    this.path = '/clothes'
    this.type = nameClothes;
    this.postImageData(imageData);
  }

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
      type: this.type
    }
    
    return this.http.post(this.API_URL + this.path, payLoad).pipe(
      catchError(err => {
        this.error.set(err.message || 'Failed to upload image');
        return of(null);
      })
    ).subscribe(() => {
      this.loading.set(false);
    });
  }
  
}
