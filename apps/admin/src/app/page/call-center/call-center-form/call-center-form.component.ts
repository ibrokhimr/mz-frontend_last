import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CallCenter } from 'libs/products/src/lib/models/callCenter';
import { CallCenterService } from 'libs/products/src/lib/services/callCenter.service';
interface Operator {
  name: string;
  code: string;
}
interface Company {
  name: string;
}
interface Info {
  name: string;
}
@Component({
  selector: 'call-center-form',
  templateUrl: './call-center-form.component.html',
  styles: [],
})
export class CallCenterFormComponent implements OnInit {
  operators: Operator[];
  selectedOperator: Operator = { name: 'Muhtaram', code: 'mh' };
  companies: Company[];
  selectedCompany: Company = { name: 'Alifshop' };
  infoes: Info[];
  selectedInfo: Info = { name: '' };
  form: FormGroup;
  isSubmitted: boolean = false;
  editMode = false;
  currentCenterID: string;

  constructor(
    private formBuilder: FormBuilder,
    private callCenterService: CallCenterService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.operators = [
      { name: 'Muhtaram', code: 'mh' },
      { name: 'Dinara', code: 'dn' },
      { name: 'Sevinch', code: 'sv' },
      { name: 'Rayhon', code: 'ry' },
      { name: 'Options', code: 'op' },
    ];
    this.companies = [
      { name: 'Alifshop' },
      { name: 'Tovar uz' },
      { name: 'Instagram' },
      { name: 'Facebook' },
      { name: 'Admin panel' },
      { name: 'Offline' },
      { name: 'Carafannoye radio' },
      { name: 'Aftobus' },
      { name: 'Metro' },
      { name: 'Intend' },
      { name: 'Net otveta' },
      { name: 'Mobilezone' },
    ];
    this.infoes = [
      { name: 'Offline tochka' },
      { name: 'Kogda dastavlat' },
      { name: 'Etap zayapka' },
      { name: 'Otavari' },
      { name: 'vremya raboti' },
      { name: 'kontakti partnerov' },
      { name: 'Grafik oplata' },
    ];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      clientFullName: ['', Validators.required],
      source: ['',],
      product: ['',],
      phoneNumber: ['', Validators.required],
      operator: ['', Validators.required],
      typeCall: [''],
      payMethod: [''],
      report: [''],
      information: [''],

    });

    this._checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const centerData: CallCenter = {
      id: this.currentCenterID,
      clientFullName: this.centerForm.clientFullName.value,
      typeCall: this.centerForm.typeCall.value,
      source: this.selectedCompany.name,
      phoneNumber: this.centerForm.phoneNumber.value,
      product: this.centerForm.product.value,
      operator: this.selectedOperator.name,
      payMethod: this.centerForm.payMethod.value,
      information: this.selectedInfo.name,
      report: this.centerForm.report.value,

    };
    if (this.editMode) {
      // this._updateCategory(centerData)
    } else {
      this._addCenterData(centerData);
    }
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCenterID = params.id;
        this.callCenterService.getCalCenter(params.id).subscribe((data) => {
          this.centerForm.clientFullName.setValue(data.clientFullName);
          this.centerForm.source.setValue(data.source);
          this.centerForm.product.setValue(data.product);
          this.centerForm.phoneNumber.setValue(data.phoneNumber);
          this.centerForm.operator.setValue(data.operator);
          this.centerForm.payMethod.setValue(data.payMethod);
        });
      }
    });
  }

  private _addCenterData(callCenter: CallCenter) {
    this.callCenterService.createCenterData(callCenter).subscribe(
      (callCenter: CallCenter) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Call center Data ${callCenter.clientFullName} is Created`,
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
          detail: 'Call center is not Created',
        });
      }
    );
  }

  // private _updateCategory(callCenter:CallCenter){
  //   this.callCenterService.(callCenter).subscribe(
  //     (category:Category) => {
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Success',
  //       detail: `Category ${category.name} is Updated`,
  //     });
  //     timer(2000).toPromise().then(done=>{
  //       this.location.back()
  //     })
  //   },()=>{
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Category is not Updated',
  //     });
  //   });
  // }

  onCancel() {
    this.location.back();
  }

  get centerForm() {
    return this.form.controls;
  }
}
