import { Component } from '@angular/core';
import { CLOTHES_CATEGORIES } from 'src/app/constants/categories';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery = '';
  searchResult: Array<{path: string, original: any, categoryName: any, subCategoryName: any, subsubCategoryName: any}> = [];

  search() {
    if(!this.searchQuery.trim()) {
      this.searchResult = []
      return
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.searchResult = [];

    const searchInCategories = (categories: any[], path: string) => {
      for (const category of categories){
        const currentPath = path ? `${path} > ${category.name}` : category.name;

        if(category.name.toLowerCase().startsWith(query)) {
          const pathParts = currentPath.split(' > ');
          const categoryName = pathParts[0];
          const subCategoryName = pathParts.length > 1 ? pathParts[1] : undefined;
          const subsubCategoryName = pathParts.length > 2 ? pathParts[2] : undefined;

          this.searchResult.push({
            path: currentPath,
            original: category,
            categoryName: categoryName,
            subCategoryName: subCategoryName,
            subsubCategoryName: subsubCategoryName
          });
        }

        if(category.subCategories){
          searchInCategories(category.subCategories, currentPath)
        }

        if(category.subSubCategories) {
          searchInCategories(category.subSubCategories, currentPath)
        }
      }
    }

    searchInCategories(CLOTHES_CATEGORIES, '');
  }

  getSearchParams(result: any) {
    const params: any = { now: Date.now() };
    if (result.categoryName) params.category = result.categoryName;
    if (result.subCategoryName) params.subcategory = result.subCategoryName;
    if (result.subsubCategoryName) params.subsubcategory = result.subsubCategoryName;
    return params;
  }

  clearSearch() {
    this.searchResult = [];
    this.searchQuery = '';
  }
}
