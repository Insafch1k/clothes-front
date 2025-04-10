import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { TelegramService } from './telegram.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://192.168.31.200:5000'
  type: string | undefined;
  subtype: string | undefined;
  subsubtype: string | undefined;
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
    this.path = '/human/process'
    this.type = 'not clothes'
    this.postImageData(imageData);
  }

  postImageDataClothes(imageData: string, nameClothes: string, nameSubClothes: string, nameSubSubClothes: string){
    this.path = '/clothes/process'
    this.type = nameClothes;
    this.subtype = nameSubClothes;
    this.subsubtype = nameSubSubClothes;
    this.postImageData(imageData);
  }

  postImageData(imageData: string) {
    const initData = this.telegramService.getInitDataUnsafe()
    //const userId = initData.user?.id;
    const userId = 'a';
    let payLoad: {};

    if(!userId){
      this.error.set('User identefication failed')
      return
    }

    this.loading.set(true);
    this.error.set(null);

    if(this.path == '/human/process'){
      payLoad = {
        image: imageData,
        user_name: userId,
      }
    }
    else {
      payLoad = {
        image: imageData,
        user_name: userId,
        category: this.type,
        subcategory: this.subtype,
        sub_subcategory: this.subsubtype
      }
    }

    console.log(this.API_URL + this.path)
    console.log(payLoad)   


    return this.http.post<{
      image_base64: string;
      message: string;
    }>(this.API_URL + this.path, payLoad).pipe(
      catchError(err => {
        return of(null);
      })
    ).subscribe((response) => {
      this.loading.set(false);
      if (response) {
        if (this.type === 'not clothes'){
          const uploadedPhoto = response.image_base64;
          const catalogData = response.message;

          console.log(uploadedPhoto);
          console.log(catalogData)

          this.uploadedPhotoBody$.next(uploadedPhoto)
          this.catalogData = catalogData;
        }
        else{
          const uploadedPhoto = response.image_base64;
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
