import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  imageData: string | null = null;
  private subscription!: Subscription;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.subscription = this.apiService.uploadedPhotoBody$.subscribe(photo => {
      this.imageData = photo;
    });
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
