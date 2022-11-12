import { Component, OnInit } from '@angular/core';
import {
  CallCenterService,
  ProductsService,
} from '@variant-bor-uz-frontend/products';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CallCenter } from 'libs/products/src/lib/models/callCenter';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '@variant-bor-uz-frontend/products';
import { SelectItem } from 'primeng/api';
import { timer } from 'rxjs';

interface Manager {
  name: string;
}

interface State {
  name: string;
}

interface Partner {
  name: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'variant-bor-uz-frontend-purchase-list',
  templateUrl: './purchase-list.component.html',
  styles: [
    `
      :host ::ng-deep .p-cell-editing {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `,
  ],
})
export class PurchaseListComponent implements OnInit {
  managers: Manager[];
  selectedManager: Manager = { name: 'Другие' };

  statuses: State[];
  selectedStatus: State = { name: 'Другие' };
  partners: Partner[];
  selectedPartner: Partner = { name: 'Другие' };
  purchase = [];
  callCenterTwo: CallCenter[];

  clonedCallcenters: { [s: string]: CallCenter } = {};
  editMode = false;
  currentCenterID: string;
  orderNumber: string;

  constructor(
    private messageService: MessageService,
    private callCenterService: CallCenterService,
  ) {
    this.managers = [
      { name: 'Другие' },
      { name: 'Muhtaram' },
      { name: 'Dinara' },
      { name: 'Sevinch' },
      { name: 'Rayhon' },
    ];
    this.statuses = [
      { name: 'Другие' },
      { name: 'Noviy' },
      { name: 'Ojidanie Dokumentov' },
      { name: 'Oformlenie' },
      { name: 'Pereden v zakup' },
      { name: 'Soglasavanie v klientom' },
      { name: 'Perevozka tovara' },
      { name: 'Na dastovke' },
      { name: 'Zakrito' },
      { name: 'Proval' },
    ];
    this.partners = [
      { name: 'Другие' },
      { name: 'Admin panel' },
      { name: 'Alifshop' },
      { name: 'Peymart' },
      { name: 'Z-market' },
      { name: 'Intend' },
      { name: 'Iman' },
      { name: 'Yunired' },
      { name: 'Davr bank' },
      { name: 'SQB' },
    ];
  }

  ngOnInit() {

    this.callCenterService
      .getCallCenters()
      .subscribe((data) => (this.callCenterTwo = data.filter(callCenter => callCenter.payMethod != "")));

  }

  onSubmit(callcenter) {

    const upData: CallCenter = {
      id: callcenter._id,
      manager: this.selectedManager.name == 'Другие'? callcenter.manager : this.selectedManager.name,
      status: this.selectedStatus.name == 'Другие'? callcenter.status : this.selectedStatus.name,
      partner: this.selectedPartner.name == 'Другие'? callcenter.partner : this.selectedPartner.name,
      orderNumber: this.orderNumber,
    };
      this._updateData(upData);
  }

  onRowEditInit(callCenter: CallCenter) {
    this.clonedCallcenters[callCenter.id] = { ...callCenter };
  }

  onRowEditSave(callCenter: CallCenter) {
    delete this.clonedCallcenters[callCenter.id];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data is updated',
    });
  }

  onRowEditCancel(callCenter: CallCenter, index: number) {
    this.callCenterTwo[index] = this.clonedCallcenters[callCenter.id];
    delete this.callCenterTwo[callCenter.id];
  }




  private _updateData(callCenter: CallCenter) {
    this.callCenterService.updateCenterData(callCenter).subscribe(
      (callCenter: CallCenter) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Call center Data ${callCenter.clientFullName} is Updated`,
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            window.location.reload();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Call center is not Updated',
        });
      }
    );
  }
}
