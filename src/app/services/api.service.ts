import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { TelegramService } from './telegram.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://192.168.0.106:5000'
  type: string | undefined;
  loading = signal(false);
  error = signal<string | null>(null);
  path: string | undefined;

  uploadedPhotoBody$ = new BehaviorSubject<string | null>(null)
  uploadedPhotoClothes$ = new BehaviorSubject<string | null>(null)
  catalogData: string | null = null;

  constructor(
    private http: HttpClient,
    private telegramService: TelegramService
  ) { }

  postImageDataBody(imageData: string){
    this.path = '/human'
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
    //const userId = initData.user?.id;
    const userId = 'ruslan';

    if(!userId){
      this.error.set('User identefication failed')
      return
    }

    this.loading.set(true);
    this.error.set(null);
    
    const payLoad = {
      image: imageData,
      userId: userId,
      type: this.type
    }

    console.log(this.API_URL + this.path)
    console.log(payLoad)   


    return this.http.post<{
      image__base64: string;
      message: string;
    }>(this.API_URL + this.path, payLoad).pipe(
      catchError(err => {
        return of(null);
      })
    ).subscribe((response) => {
      this.loading.set(false);
      if (response) {
        if (this.type === 'not clothes'){
          const uploadedPhoto = response.image__base64;
          const catalogData = response.message;

          console.log(uploadedPhoto);
          console.log(catalogData)

          this.uploadedPhotoBody$.next(uploadedPhoto)
          this.catalogData = catalogData;
        }
        else{
          const uploadedPhoto = response.image__base64;
          const catalogData = response.message;

          console.log(uploadedPhoto);
          console.log(catalogData)

          this.uploadedPhotoClothes$.next(uploadedPhoto)
          this.catalogData = catalogData;
        }
      }
    });
  }
}
