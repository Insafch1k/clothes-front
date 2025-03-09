import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { WardrobeComponent } from './pages/wardrobe/wardrobe.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BottomHeaderComponent } from './components/bottom-header/bottom-header.component';
import { DownloaderButtonsComponent } from './components/downloader-buttons/downloader-buttons.component';
import { ConfirmButtonsComponent } from './components/confirm-buttons/confirm-buttons.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatalogComponent,
    WardrobeComponent,
    ProfileComponent,
    BottomHeaderComponent,
    DownloaderButtonsComponent,
    ConfirmButtonsComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
