import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showBottomHeader: Boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.showBottomHeader = !this.router.url.includes('/gallery')
    })
  }
}
