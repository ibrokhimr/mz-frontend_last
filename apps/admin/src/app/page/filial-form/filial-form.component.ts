import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Filial } from '@variant-bor-uz-frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'variant-bor-uz-frontend-filial-form',
  templateUrl: './filial-form.component.html',
  styles: [],
})
export class FilialFormComponent implements OnInit {
  dillers = [];
  formFilial: FormGroup;
  isSubmitted: boolean = false;
  editMode = false;
  currentCategoryID: string;
  message: string;
  dillerID;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getDillers();
    this.categoriesService.currentMessage.subscribe(
      (message) => (this.message = message)
    );
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.formFilial.invalid) {
      return;
    }
    const filialFormData: Filial = {
      phoneNumber: this.filialsForm.phoneNumber.value,
      address: this.filialsForm.address.value,
      accountNumber: this.filialsForm.accountNumber.value,
      serialNumber: this.filialsForm.serialNumber.value,
      bankNumber: this.filialsForm.bankNumber.value,
      cardNumber: this.filialsForm.cardNumber.value,
      typeFilial: this.filialsForm.typeFilial.value,
      tranzitAccount: this.filialsForm.tranzitAccount.value,
      inn: this.filialsForm.inn.value,
      employer: this.filialsForm.employer.value,
      diller: this.dillerID,

    };
    if (this.editMode) {
      // this._updateProduct(filialFormData)
    } else {
      this._addFilial(filialFormData);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _initForm() {
    this.formFilial = this.formBuilder.group({
      address: ['', Validators.required],
      accountNumber: ['', Validators.required],
      serialNumber: ['', Validators.required],
      bankNumber: ['', Validators.required],
      diller: '',
      inn: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      tranzitAccount: ['', Validators.required],
      cardNumber: ['', Validators.required],
      typeFilial: ['', Validators.required],
      employer: ['', Validators.required],
    });
  }
  private _addFilial(filialData: Filial) {
    this.categoriesService.createFilial(filialData).subscribe(
      (filial: Filial) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Филиал ${filial.typeFilial} создан`,
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Филиал не создан',
        });
      }
    );
  }
  private _getDillers() {
    this.categoriesService.getDillers().subscribe((dillers) => {
      this.dillers = dillers;
      for (let i = 0; i < this.dillers.length; i++) {
        if (this.dillers[i]._id == this.message) {
          this.message = this.dillers[i].diller;
          this.dillerID = this.dillers[i];
        }
      }
    });
  }

  get filialsForm() {
    return this.formFilial.controls;
  }
}
