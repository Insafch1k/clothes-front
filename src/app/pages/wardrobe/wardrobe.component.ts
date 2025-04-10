import { Component } from '@angular/core';
import { CLOTHES_CATEGORIES } from 'src/app/constants/categories';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss']
})
export class WardrobeComponent {
  isSearchOpen: boolean = false;
  isSubCatalogOpen = true;

  categories = CLOTHES_CATEGORIES

  toggleCategory(category: any){
    this.isSubCatalogOpen = false;

    this.categories.forEach((cat) => {
      if(cat == category){
        cat.isSubMenuOpen = true
      }
      else{cat.isSubMenuOpen = false}
    });
  }

  closeCategory() {
    this.isSubCatalogOpen = true;
  }

}
