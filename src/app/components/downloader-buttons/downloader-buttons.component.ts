import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloader-buttons',
  templateUrl: './downloader-buttons.component.html',
  styleUrls: ['./downloader-buttons.component.scss']
})
export class DownloaderButtonsComponent {
  isHidden = false;
  isHiddenTwo = false;
  isSwitch = false;
  isThing = false;

  constructor(private router: Router) {}

  toggleContainer() {
    this.isHidden = !this.isHidden;
  }

  toggleContainerTwo() {
    this.isHiddenTwo = !this.isHiddenTwo;
  }

  toggleSwitching() {
    this.isHidden = false;
    this.isHiddenTwo = false;
    this.isSwitch = !this.isSwitch;
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
