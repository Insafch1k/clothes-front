import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloader-buttons',
  templateUrl: './downloader-buttons.component.html',
  styleUrls: ['./downloader-buttons.component.scss']
})
export class DownloaderButtonsComponent {
  isHiddenTwo = false;
  isThing = true;

  constructor(private router: Router) {}

  toggleContainerTwo() {
    this.isHiddenTwo = !this.isHiddenTwo;
  }

  toggleThing1(){
    this.isThing = true
  }

  toggleThing2(){
    this.isThing = false
  }

  navigateToCamera(action: string){
    this.router.navigate(['/gallery'],{
      state: {action}
    })
  }
}
