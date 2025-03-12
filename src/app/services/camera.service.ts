import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private videoElement?: HTMLVideoElement;
  private canvasElement?: HTMLCanvasElement;
  private stream?: MediaStream;
  private imageDataSubject = new BehaviorSubject<string | null>(null);
  imageData$ = this.imageDataSubject.asObservable();

  constructor(private router: Router) {}

  setVideoElement(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
    this.videoElement = video;
    this.canvasElement = canvas;
  }

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({video: true});
      if (this.videoElement) {
        this.videoElement.srcObject = this.stream;
        this.videoElement.play();
      }
    } catch (error) {
      console.error('Camera error:', error);
      alert('Please allow camera access to continue');
    }
  }

  capturePhoto(){
    if(!this.canvasElement || !this.videoElement)return

    const context = this.canvasElement.getContext('2d');

    if(!context) return;

    [this.canvasElement.width, this.canvasElement.height] = [this.videoElement.videoWidth, this.videoElement.videoHeight];
    context.drawImage(this.videoElement, 0, 0);
    const newImageData = this.canvasElement.toDataURL('image/png');
    this.imageDataSubject.next(newImageData)
    this.router.navigate(['/confirmation'])
  }

  loadPhotoFromGallery(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
  
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const newImage = e.target?.result as string;
      this.imageDataSubject.next(newImage);
      this.router.navigate(['/confirmation']);
    };
  
    reader.readAsDataURL(file);
    inputElement.value = '';
  }

  savePhoto() {

  }

  stopCamera() {
    this.stream?.getTracks().forEach(track => {
      track.stop();
    });
    this.stream = undefined; 
  }
}