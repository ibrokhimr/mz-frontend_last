import { Component, OnInit } from '@angular/core';
import { Shop, ShopsService, Procent } from '@variant-bor-uz-frontend/users';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'variant-bor-uz-frontend-shops-list',
  templateUrl: './shops-list.component.html',
  styles: [
  ]
})
export class ShopsListComponent implements OnInit {
  protcentForm: FormGroup;
  procent12: Number;
  procent18: Number;

  shops: Shop[] = [];
  procents = []
  procentBlock = false;

  constructor(
    private shopsService: ShopsService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {

  }

  ngOnInit(): void {
    this._getShops();
    this._getProcent()
    setTimeout(() => {
      console.log(this.procents);

    }, 1000);
  }

  updateShop(shopid: string) {
    this.router.navigateByUrl(`shops/form/${shopid}`);
  }

  private _getShops() {
    this.shopsService.getShops().subscribe((shops) => {
      this.shops = shops;
    });
  }

  private _getProcent() {
    this.shopsService.getProcent().subscribe((procents) => {
      this.procents = procents
    });
  }

  private _updateProcent(procent: Procent) {
    this.shopsService.updateProcent(procent).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Стандартный процент успешно изменен!'
        });
        this._getShops();
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Стандартный процент не изменен'
        });
      }
    );
  }

  private _changeProcent() {
    this._initProcentForm();
    this.procentBlock = true;
  }

  sendNewProcent() {
    //bazaga yuborish

    const procent: Procent = {
      procent12: this.procentForm.procent12.value,
      procent18: this.procentForm.procent18.value,
    };

    this._updateProcent(procent);
    this.procentBlock = false;
  }

  private _hiddenProcent() {
    this.procentBlock = false;
  }

  private _initProcentForm() {
    this.protcentForm = this.formBuilder.group({
      procent12: ['', Validators.required],
      procent18: ['', Validators.required]
    });
  }

  get procentForm() {
    return this.protcentForm.controls;
  }

}
