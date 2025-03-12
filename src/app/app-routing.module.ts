import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { WardrobeComponent } from './pages/wardrobe/wardrobe.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  title: 'Главная',
},{
  path: 'catalog',
  component: CatalogComponent,
  title: 'Каталог',
},{
  path: 'wardrobe',
  component: WardrobeComponent,
  title: "Гардероб"
},{
  path: 'gallery',
  component: GalleryComponent,
  title: "Галерея"
},{
  path: 'confirmation',
  component: ConfirmationComponent,
  title: "Подтверждение"
},{
  path: 'profile',
  component: ProfileComponent,
  title: "Профиль"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
