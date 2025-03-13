import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  imageData: string | null = null;
  private subscription!: Subscription;

  constructor(
    private cameraService: CameraService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.cameraService.imageData$.subscribe(data => {
      this.imageData = data;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
