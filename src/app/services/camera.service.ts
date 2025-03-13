import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: 'environment',
    width: { ideal: 1920 },
    height: { ideal: 1080 }
  }
};

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

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

  async startCamera(): Promise<void> {
    try {
      await this.stopCamera();
      this.stream = await this.initializeCamera(DEFAULT_CAMERA_CONSTRAINTS);
      this.setVideoStream(this.stream);
    } catch (error) {
      this.handleCameraError(error);
    }
  }

  capturePhoto(): void {
    if (!this.canvasElement || !this.videoElement) return;

    const context = this.canvasElement.getContext('2d');
    if (!context) return;

    this.setCanvasDimensions();
    context.drawImage(this.videoElement, 0, 0);
    
    const imageData = this.canvasElement.toDataURL('image/png');
    this.imageDataSubject.next(imageData);
    this.router.navigate(['/confirmation']);
  }

  loadPhotoFromGallery(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file || !this.isValidImageType(file)) {
      alert('Пожалуйста, выберите файл изображения (JPEG, PNG, WEBP)');
      return;
    }

    this.readImageFile(file);
    input.value = '';
  }

  stopCamera() {
    this.stream?.getTracks().forEach(track => {
      track.stop();
      this.videoElement?.removeAttribute('srcObject');
    });
    this.stream = undefined;
  }

  private async initializeCamera(constraints: MediaStreamConstraints): Promise<MediaStream> {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      if (error instanceof DOMException && constraints.video && error.name === 'NotAllowedError') {
        return navigator.mediaDevices.getUserMedia({ video: true });
      }
      throw error;
    }
  }

  private setVideoStream(stream: MediaStream): void {
    if (!this.videoElement) return;
    
    this.videoElement.srcObject = stream;
    this.videoElement.play().catch(error => {
      console.error('Video play error:', error);
    });
  }

  private setCanvasDimensions(): void {
    if (!this.canvasElement || !this.videoElement) return;
    
    this.canvasElement.width = this.videoElement.videoWidth;
    this.canvasElement.height = this.videoElement.videoHeight;
  }
  
  private isValidImageType(file: File): boolean {
    return ALLOWED_IMAGE_TYPES.includes(file.type);
  }

  private readImageFile(file: File): void {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      this.imageDataSubject.next(e.target?.result as string);
      this.router.navigate(['/confirmation']);
    };
    
    reader.onerror = () => {
      alert('Ошибка при чтении файла');
    };
    
    reader.readAsDataURL(file);
  }

    private handleCameraError(error: unknown): void {
    console.error('Camera error:', error);
    if (error instanceof DOMException) {
    alert(error.name === 'NotAllowedError' 
      ? 'Для работы приложения требуется доступ к камере' 
      : 'Ошибка доступа к камере');
    }
  }
}