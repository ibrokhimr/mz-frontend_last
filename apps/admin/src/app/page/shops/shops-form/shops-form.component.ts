import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ShopsService, Shop } from '@variant-bor-uz-frontend/users';

@Component({
  selector: 'variant-bor-uz-frontend-shops-form',
  templateUrl: './shops-form.component.html',
  styles: [
  ]
})
export class ShopsFormComponent implements OnInit {
  form: FormGroup;
  editmode = false;
  currentShopId: string;
  isSubmitted = false;
  oy12= 38;
  oy18 = 56

  dataShopType = [];
  procents = []

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private shopsService: ShopsService,
  ) {

    this.dataShopType = [
      { type: 'Выберите тип', value:' ' },
      { type: 'Стандартный', value:'Стандартный' },
      { type: 'Индивидуальный', value:'Индивидуальный' }
    ]
  }

  ngOnInit(): void {
    this._initShopForm();
    this._checkEditMode();
    this._getProcent();
  }


  private _getProcent() {
    this.shopsService.getProcent().subscribe((procents) => {
      this.procents = procents
    });
  }

  private _initShopForm() {
    this.form = this.formBuilder.group({
      shopName: ['', Validators.required],
      shopAdress: ['', Validators.required],
      shopType: ['', Validators.required],
      shopuserName: ['', Validators.required],
      userPhone: ['', Validators.required],
      userEmail: ['', Validators.required],
      shopPassword: ['', Validators.required],
      procent12: [this.oy12, Validators.required],
      procent18: [this.oy18, Validators.required]
    });
  }

  private _addShop(shop: Shop) {
    this.shopsService.createShop(shop).subscribe(
      (shop: Shop) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Shop ${shop.shopName} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Shop is not created!'
        });
      }
    );
  }

  private _updateShop(shop: Shop) {
    this.shopsService.updateShop(shop).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Shop is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Shop is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentShopId = params.id;
        this.shopsService.getShop(params.id).subscribe((shop) => {
          this.shopForm.shopName.setValue(shop.shopName);
          this.shopForm.shopAdress.setValue(shop.shopAdress);
          this.shopForm.shopType.setValue(shop.shopType);
          this.shopForm.shopuserName.setValue(shop.shopuserName);
          this.shopForm.userPhone.setValue(shop.userPhone);
          this.shopForm.userEmail.setValue(shop.userEmail);
          this.shopForm.procent12.setValue(shop.procent12);
          this.shopForm.procent18.setValue(shop.procent18);
          // this.shopForm.isAdmin.setValue(false);
          this.shopForm.shopPassword.setValidators([]);
          this.shopForm.shopPassword.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      console.log('xato forma')
      return;
    }

    const shop: Shop = {
      id: this.currentShopId,
      shopName: this.shopForm.shopName.value,
      shopAdress: this.shopForm.shopAdress.value,
      shopType: this.shopForm.shopType.value,
      shopuserName: this.shopForm.shopuserName.value,
      userPhone: this.shopForm.userPhone.value,
      userEmail: this.shopForm.userEmail.value,
      isAdmin: false,
      shopPassword: this.shopForm.shopPassword.value,
      procent12: this.shopForm.procent12.value,
      procent18: this.shopForm.procent18.value,
    };

    if (this.editmode) {
      this._updateShop(shop);
    } else {
      this._addShop(shop);
    }
  }

  onCancel() {
    this.location.back();
  }

  get shopForm() {
    return this.form.controls;
  }

}
