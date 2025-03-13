import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit{
  @ViewChild('videoElement') videoElementRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElementRef!: ElementRef<HTMLCanvasElement>;


  constructor(
    private cameraService: CameraService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.cameraService.setVideoElement(
      this.videoElementRef.nativeElement,
      this.canvasElementRef.nativeElement
    );
    this.cameraService.startCamera();
  }

  takeAPhoto() {
    this.cameraService.capturePhoto();
    this.router.navigate(['/confirmation'])
  }

  uploadPhoto(event: Event) {
    this.cameraService.loadPhotoFromGallery(event);
    this.router.navigate(['/confirmation'])
  }

  backButton1() {
    this.cameraService.stopCamera();
    this.router.navigate([''])
  }
}