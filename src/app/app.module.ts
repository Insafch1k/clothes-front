import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { WardrobeComponent } from './pages/wardrobe/wardrobe.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BottomHeaderComponent } from './components/bottom-header/bottom-header.component';
import { DownloaderButtonsComponent } from './components/downloader-buttons/downloader-buttons.component';
import { CategoryComponent } from './components/category/category.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { AddClothesComponent } from './pages/add-clothes/add-clothes.component';
import { MeshWardrobeComponent } from './pages/mesh-wardrobe/mesh-wardrobe.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatalogComponent,
    WardrobeComponent,
    ProfileComponent,
    BottomHeaderComponent,
    DownloaderButtonsComponent,
    CategoryComponent,
    GalleryComponent,
    ConfirmationComponent,
    AddClothesComponent,
    MeshWardrobeComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
