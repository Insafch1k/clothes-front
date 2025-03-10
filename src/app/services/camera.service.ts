import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private videoElement?: HTMLVideoElement;

  setVideoElement(video: HTMLVideoElement) {
    this.videoElement = video;
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      if (this.videoElement) {
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      }
    } catch (error) {
      console.error('Camera error:', error);
      alert('Please allow camera access to continue');
    }
  }

  capturePhoto() {
  }
}