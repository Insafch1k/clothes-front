import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-downloader-buttons',
  templateUrl: './downloader-buttons.component.html',
  styleUrls: ['./downloader-buttons.component.scss']
})
export class DownloaderButtonsComponent {
  @ViewChild('videoElement', { static: true }) videoElementRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement', { static: true }) canvasElementRef!: ElementRef<HTMLCanvasElement>;
  imageData: string | null = null;

  constructor() {}
}
