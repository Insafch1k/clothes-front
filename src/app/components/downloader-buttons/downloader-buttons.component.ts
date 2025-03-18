import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloader-buttons',
  templateUrl: './downloader-buttons.component.html',
  styleUrls: ['./downloader-buttons.component.scss']
})
export class DownloaderButtonsComponent {
  isHidden = false;

  constructor(private router: Router) {}

  toggleContainer() {
    this.isHidden = !this.isHidden;
    console.log(this.isHidden)
  }

  navigateToCamera(action: string){
    this.router.navigate(['/gallery'],{
      state: {action}
    })
  }
}
