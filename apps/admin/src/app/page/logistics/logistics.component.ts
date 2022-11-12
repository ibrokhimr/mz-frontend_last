/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { CallCenterService } from '@variant-bor-uz-frontend/products';

import { CallCenter } from 'libs/products/src/lib/models/callCenter';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'variant-bor-uz-frontend-logistics',
  templateUrl: './logistics.component.html',
  styles: [
    `
      :host ::ng-deep .p-cell-editing {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `,
  ],
})
export class LogisticsComponent implements OnInit {

  zakups = [];
  callCentersData: CallCenter[];

  statuses: SelectItem[];

  clonedZakup: { [s: string]: CallCenter; } = {};

  constructor( private callCenterService:CallCenterService, private messageService: MessageService) { }

  ngOnInit() {
    this.callCenterService
      .getCallCenters()
      .subscribe((data) => (this.callCentersData = data));

      this.callCenterService.getCallCenters().subscribe(data => this.callCentersData = data.filter(callCenter => callCenter.payMethod != ""));

      this.statuses = [{label: 'Отправили за товаром', value: 'Отправили за товаром'},{label: 'Привезли товар', value: 'Привезли товар'},{label: 'Товар доставлен', value: 'Товар доставлен'}]
  }

  onRowEditInit(callcenter: CallCenter) {
      this.clonedZakup[callcenter.id] = {...callcenter};
  }

  onRowEditSave(callcenter: CallCenter) {
      if (callcenter) {
          delete this.clonedZakup[callcenter.id];
          this.messageService.add({severity:'success', summary: 'Success', detail:'Zakup Data is updated'});
      }
      else {
          this.messageService.add({severity:'error', summary: 'Error', detail:'Zakup Data is not updated'});
      }
  }

  onRowEditCancel(callcenter: CallCenter, index: number) {
      this.callCentersData[index] = this.clonedZakup[callcenter.id];
      delete this.callCentersData[callcenter.id];
  }


}
