import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElementRef!: ElementRef<HTMLVideoElement>;

  constructor(private cameraService: CameraService) {}

  ngAfterViewInit() {
    this.cameraService.setVideoElement(this.videoElementRef.nativeElement);
    this.cameraService.startCamera();
  }
}