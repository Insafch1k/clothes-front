import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-header',
  templateUrl: './bottom-header.component.html',
  styleUrls: ['./bottom-header.component.scss']
})
export class BottomHeaderComponent {

  constructor(
    private router: Router
  ) {}

  navigateToCamera(action: string){
    this.router.navigate(['/gallery'],{
      state: {action}
    })
  }
}
