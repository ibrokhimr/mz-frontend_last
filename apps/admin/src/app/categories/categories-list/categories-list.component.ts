import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@variant-bor-uz-frontend/products';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CategoriesService } from 'libs/products/src/lib/services/categories.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription, interval, Subject } from 'rxjs';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();

  private updateSubscription: Subscription;
  categories: Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateSubscription = interval(1000).subscribe((val) => {
      this._getCategories();
    });
  }
  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (response) => {
            this._getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is Deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not Deleted',
            });
          }
        );
      },
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
}
