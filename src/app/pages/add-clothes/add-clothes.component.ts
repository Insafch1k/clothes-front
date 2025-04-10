import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CameraService } from 'src/app/services/camera.service';
import { CLOTHES_CATEGORIES } from 'src/app/constants/categories';

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.scss']
})
export class AddClothesComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isSubMenuOpen = true;
  imageData: string | null = null;
  private subscription!: Subscription;
  nameCategory = 'Выберите категорию';
  nameIdCategory: string = '';
  nameIdSubCategory: string = '';
  nameIdSubSubCategory: string = '';

  categories = CLOTHES_CATEGORIES;

  constructor(
    private cameraService: CameraService,
    private router: Router,
    public apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.cameraService.imageData$.subscribe(data => {
      this.imageData = data;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toogleSubName(category: any) {
    category.isSubMenuOpen = !category.isSubMenuOpen
  }

  toogleSubSubName(subCategory: any) {
    subCategory.isSubSubMenuOpen = !subCategory.isSubSubMenuOpen
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.nameIdCategory = '';
    this.categories.forEach((cat) => {
      cat.isSubMenuOpen = false
    });
  }

  toggleSubMenu(category: any): void {
    this.nameIdCategory = category.name;
    this.categories.forEach((cat) => {
      if (cat !== category) {
        cat.isSubMenuOpen = false;
        cat.subCategories.forEach((subCat => {
          subCat.isSubSubMenuOpen = false;
      }))
      }
    });
  }

  toggleSubSubMenu(subCategory: any){
    this.nameIdSubCategory = subCategory.name
    this.categories.forEach((cat) => {
      cat.subCategories.forEach((subCat => {
        if (subCat !== subCategory) {
          subCat.isSubSubMenuOpen = false;
        }
      }))
    });
  }

  toggleSubSubSubMenu(subSubCategory: any){
    this.nameIdSubSubCategory = subSubCategory.name;
    this.nameCategory = subSubCategory.name;
    if (subSubCategory.nameID){
      this.nameIdCategory = subSubCategory.nameID
    }

    this.isMenuOpen = false;
    this.categories.forEach((cat) => {
      cat.isSubMenuOpen = false;
      cat.subCategories.forEach((subCat => {
          subCat.isSubSubMenuOpen = false;
      }))
    });
  }



  onBackClick(action: string) {
    this.router.navigate(['/gallery'], {
      state: {action}
    })
  }

  confirm() {
    if(!this.imageData || this.nameCategory === 'Выберите категорию') return console.log('Отсуствует либо фото, либо категорию не выбрал!!!');
    this.cameraService.stopCamera();
    if(this.nameIdSubSubCategory){
      this.apiService.postImageDataClothes(this.imageData, this.nameIdCategory, this.nameIdSubCategory, this.nameIdSubSubCategory);
    }
    this.router.navigate(['/'])
  }
}
