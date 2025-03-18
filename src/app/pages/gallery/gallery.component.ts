import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit{
  @ViewChild('videoElement') videoElementRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElementRef!: ElementRef<HTMLCanvasElement>;

  action: string | undefined;

  constructor(
    private cameraService: CameraService,
    private router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.action = navigation?.extras.state?.['action']; 
  }


  ngAfterViewInit() {
    this.cameraService.setVideoElement(
      this.videoElementRef.nativeElement,
      this.canvasElementRef.nativeElement
    );
    this.cameraService.startCamera();
  }

  capturePhoto() {
    this.cameraService.capturePhoto();
    if (this.action === 'upload-photo')
    this.router.navigate(['/confirmation'])
    else if (this.action === 'add-clothes'){
      this.router.navigate(['/add-clothes'])
    }
  }

  handleFileInput(event: Event) {
    this.cameraService.loadPhotoFromGallery(event);
    if (this.action === 'upload-photo'){
      this.router.navigate(['/confirmation'])}
    else if (this.action === 'add-clothes'){
      this.router.navigate(['/add-clothes'])
    }
  }

  onBackClick() {
    this.cameraService.stopCamera();
    this.router.navigate([''])
  }
}