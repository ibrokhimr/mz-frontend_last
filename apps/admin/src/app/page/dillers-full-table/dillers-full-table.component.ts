/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { CategoriesService } from 'libs/products/src/lib/services/categories.service';
import { Filial } from 'libs/products/src/lib/models/filial';

import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dillers-full-table',
  templateUrl: './dillers-full-table.component.html',
  styles: [],
})
export class DillersFullTableComponent implements OnInit {
  filials: Filial[] = [];
  onefilial: Filial[] = [];
  dil: any = '';
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  id:string = '1';

  constructor(
    private location: Location,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.currentMessage.subscribe(
      (message) => (this.message = message)
    );
    this._getDiller();
  }

  onCancel() {
    this.location.back();
  }
  private _getDiller() {
    this.categoriesService.getFilial().subscribe((diller) => {
      this.filials = diller;
      for (let i = 0; i < this.filials.length; i++) {
        if (this.filials[i].diller == this.message) {
          this.onefilial.push(this.filials[i]);
        }
      }
    });
  }

  updateFilial(filialid: string) {
    this.router.navigateByUrl(`dillers/formsFilial/${filialid}`);
  }
  deleteFilial(filialId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Filial?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteFilial(filialId).subscribe(
          () => {
            this._getDiller();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Filial is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Filial is not deleted!',
            });
          }
        );
      },
    });
  }




}
