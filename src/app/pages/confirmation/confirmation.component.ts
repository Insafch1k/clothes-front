import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy{
  imageData: string | null = null;
  private subscription!: Subscription

  constructor(
    private cameraService: CameraService,
    private router: Router,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    this.subscription = this.cameraService.imageData$.subscribe(data => {
      this.imageData = data;
    })
  }

  confirm() {
    if(this.imageData){
      this.apiService.postImageDataBody(this.imageData)
    }
    this.cameraService.stopCamera();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
