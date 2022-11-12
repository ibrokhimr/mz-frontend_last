import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { CategoriesService, Dillers } from '@variant-bor-uz-frontend/products';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'admin-diller-form',
  templateUrl: './dillers-form.component.html',
  styles: [],
})
export class DillersFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  editMode = false;
  currentCategoryID: string;
  count = 1;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      diller: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      tax: ['', Validators.required],
    });

    this._checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    this.count++;
    if (this.form.invalid) {
      return;
    }

    const diller: Dillers = {
      id: this.currentCategoryID,

      phoneNumber: this.dillersForm.phoneNumber.value,
      address: this.dillersForm.address.value,
      diller: this.dillersForm.diller.value,
      tax: this.dillersForm.tax.value,
    };
    if (this.editMode) {
      this._updateDiller(diller);
    } else {
      this._addDiller(diller);
    }
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryID = params.id;
        this.categoriesService.getDiller(params.id).subscribe((dillers) => {
          this.dillersForm.diller.setValue(dillers.diller);

          this.dillersForm.phoneNumber.setValue(dillers.phoneNumber);
          this.dillersForm.tax.setValue(dillers.tax);
          this.dillersForm.address.setValue(dillers.address);
        });
      }
    });
  }

  private _addDiller(category: Dillers) {
    this.categoriesService.createDiller(category).subscribe(
      (diller: Dillers) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Диллер ${diller.diller} создан`,
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
          detail: 'Диллер не создан',
        });
      }
    );
  }

  private _updateDiller(diller: Dillers) {
    this.categoriesService.updateDiller(diller).subscribe(
      (diller: Dillers) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Диллер ${diller.diller}  обновлен`,
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Дилер не обновляется',
        });
      }
    );
  }

  onCancel() {
    this.location.back();
  }

  get dillersForm() {
    return this.form.controls;
  }
}
