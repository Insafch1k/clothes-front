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
  isSubMenuOpen = true;
  imageData: string | null = null;
  private subscription!: Subscription;
  nameCategory = 'Выберите категорию';
  nameIDCategory: string | null = null;

  categories = [
    {
      name: 'Женская одежда',
      isSubMenuOpen: false,
      subCategories: [
        { name: 'Платья',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Вечерние'},
            {name: 'Повседневные'},
            {name: 'Летние'},
            {name: 'Офисные'},
          ]
        },
        { name: 'Верхняя одежда',
          isSubSubMenuOpen: false,
          subSubCategories: [
            { name: 'Пальто',
              nameID: 'Пальто женское'
            },
            {name: 'Куртки'},
            {name: 'Пуховики'},
            {name: 'Плащи'},
            {name: 'Ветровки'},
          ]
        },
        { name: 'Блузки и рубашки',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Блузки'},
            {name: 'Рубашки'},
            {name: 'Топы'},
          ]
        },
        { name: 'Юбки',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Мини-юбки'},
            {name: 'Миди-юбки'},
            {name: 'Длинные'},
            {name: 'Юбки-карандаш'},
          ]
        },
        { name: 'Брюки и джинсы',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Джинсы'},
            {name: 'Брюки'},
            {name: 'Леггинсы'},
            {name: 'Шорты'},
          ]
        },
        { name: 'Спортивная одежда',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Спортивные костюмы'},
            {name: 'Футболки'},
            {name: 'Шорты'},
            {name: 'Лосины'},
          ]
        },
        { name: 'Домашняя одежда',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Пижамы'},
            {name: 'Халаты'},
            {name: 'Комплекты'},
          ]
        },
        { name: 'Обувь',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Кроссовки'},
            {name: 'Туфли'},
            {name: 'Сапоги'},
            {name: 'Басоножки'},
          ]
        },
      ],
    },
    {
      name: 'Мужская одежда',
      isSubMenuOpen: false,
      subCategories: [
        { name: 'Рубашки',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Повседневные'},
            {name: 'Офисные'},
            {name: 'Официальные'},
          ]
        },
        { name: 'Футболки и поло',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Футболки'},
            {name: 'Майки'},
            {name: 'Поло'},
          ]
        },
        { name: 'Брюки и джинсы',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Джинсы'},
            {name: 'Класические брюки'},
            {name: 'Шорты'},
          ]
        },
        { name: 'Верхняя одежда',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Куртки'},
            {name: 'Пальто'},
            {name: 'Пуховики'},
            {name: 'Ветровки'}
          ]
        },
        { name: 'Спортивная одежда',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Спортивные котюмы'},
            {name: 'Футболки'},
            {name: 'Шорты'},
          ]
        },
        { name: 'Домашняя одежда',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Пижамы'},
            {name: 'Халаты'},
            {name: 'Комплекты'},
          ]
        },
        { name: 'Обувь',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Кроссовки'},
            {name: 'Туфли'},
            {name: 'Ботинки'},
            {name: 'Сандалии'},
          ]
        },
      ],
    },
    {
      name: 'Детская одежда',
      isSubMenuOpen: false,
      subCategories: [
        { name: 'Для девочек',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Платья'},
            {name: 'Юбки'},
            {name: 'Блузки'},
            {name: 'Верхняя одежда'},
          ]
        },
        { name: 'Для мальчиков',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Рубашки'},
            {name: 'Футболки'},
            {name: 'Брюки'},
            {name: 'Верхняя одежда'},
          ]
        },
        { name: 'Одежда для малышей',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Комбинезоны'},
            {name: 'Ползунки'},
            {name: 'Боди'},
            {name: 'Пижамы'},
          ]
        },
        { name: 'Обувь',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Кроссовки'},
            {name: 'Сандалии'},
            {name: 'Ботинки'},
          ]
        },
      ],
    },
    {
      name: 'Аксессуары',
      isSubMenuOpen: false,
      subCategories: [
        { name: 'Сумки',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Рюкзаки'},
            {name: 'Клатчи'},
            {name: 'Сумки через плечо'},
          ]
        },
        { name: 'Головные уборы',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Шапки'},
            {name: 'Кепки'},
            {name: 'Шляпы'},
          ]
        },
        { name: 'Шарфы и перчатки',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Шарфы'},
            {name: 'Перчатки'},
            {name: 'Варежки'},
          ]
        },
        { name: 'Ремни',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Кожанные'},
            {name: 'Тканевые'}
          ]
        },
        { name: 'Украшения',
          isSubSubMenuOpen: false,
          subSubCategories: [
            {name: 'Серьги'},
            {name: 'Кольца'},
            {name: 'Браслеты'}
          ]
        },
      ],
    },
  ];

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
    this.nameIDCategory = null;
    this.categories.forEach((cat) => {
      cat.isSubMenuOpen = false
    });
  }

  toggleSubMenu(category: any): void {
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
    this.categories.forEach((cat) => {
      cat.subCategories.forEach((subCat => {
        if (subCat !== subCategory) {
          subCat.isSubSubMenuOpen = false;
        }
      }))
    });
  }

  toggleSubSubSubMenu(subSubCategory: any){
    this.nameCategory = subSubCategory.name;
    if (subSubCategory.nameID){
      this.nameIDCategory = subSubCategory.nameID
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
    if(this.nameIDCategory){
      console.log(this.nameIDCategory)
      this.apiService.postImageDataClothes(this.imageData, this.nameIDCategory);
    }
    else {
      console.log(this.nameCategory)
      this.apiService.postImageDataClothes(this.imageData, this.nameCategory);
    }
    this.router.navigate(['/'])
  }
}
