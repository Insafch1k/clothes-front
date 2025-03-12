import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy{
  imageData: string | null = null;
  private subscription!: Subscription

  constructor(private cameraService: CameraService) {}

  ngOnInit() {
    this.subscription = this.cameraService.imageData$.subscribe(data => {
      this.imageData = data;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
