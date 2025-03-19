import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.scss']
})
export class AddClothesComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  imageData: string | null = null;
  private subscription!: Subscription;
  nameCategory = 'Выберите категорию';

  categories = [
    {
      name: 'Одежда',
      isSubMenuOpen: false,
      subCategories: [
        { name: 'Футболки'},
        { name: 'Джинсы'},
        { name: 'Куртки'},
      ],
    },
    {
      name: 'Обувь',
      isSubMenuOpen: false,
      subCategories: [
        { name: 'Ботинки'},
        { name: 'Кеды'},
        { name: 'Кросовки'},
      ],
    },
    {
      name: 'Головные уборы',
      isSubMenuOpen: false,
      subCategories: [
        { name: 'Кепка'},
        { name: 'Панамка'},
      ],
    },
  ];

  constructor(
    private cameraService: CameraService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cameraService.imageData$.subscribe(data => {
      this.imageData = data;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubMenu(category: any): void {
    this.categories.forEach((cat) => {
      if (cat !== category) {
        cat.isSubMenuOpen = false;
      }
    });

    if (category.isSubMenuOpen){
      this.isMenuOpen = false;
    }

    category.isSubMenuOpen = !category.isSubMenuOpen;
  }
  
  toggleSubSubMenu(subCategory: any){
    this.nameCategory = subCategory.name
  }

  onBackClick(action: string) {
    this.router.navigate(['/gallery'], {
      state: {action}
    })
  }

  confirm() {
    if(!this.imageData || this.nameCategory === 'Выберите категорию') return console.log('Отсуствует либо фото, либо категорию не выбрал!!!')
    this.apiService.postImageDataClothes(this.imageData, this.nameCategory);
    this.cameraService.stopCamera();
    this.router.navigate(['/'])
  }
}
