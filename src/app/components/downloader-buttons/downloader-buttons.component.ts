import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloader-buttons',
  templateUrl: './downloader-buttons.component.html',
  styleUrls: ['./downloader-buttons.component.scss']
})
export class DownloaderButtonsComponent {
  constructor(private router: Router) {}

  async handleCameraButton() {
    await this.router.navigate(['/gallery']);
  }
}
