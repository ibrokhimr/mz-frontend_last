import { Component, OnInit } from '@angular/core';
import { CallCenterService } from '@variant-bor-uz-frontend/products';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CallCenter } from 'libs/products/src/lib/models/callCenter';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

interface StatusZakup {
  name: string;
}

interface Perevozka {
  name: string;
}

interface MethodZakup {
  name: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'variant-bor-uz-frontend-zakup-list',
  templateUrl: './zakup-list.component.html',
  styles: [
    `
      :host ::ng-deep .p-cell-editing {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `,
  ],
})
export class ZakupListComponent implements OnInit {
  statusesZakup: StatusZakup[];
  selectedStatusZakup: StatusZakup = { name: 'Есть в наличии' };
  deliveries: Perevozka[];
  selectedDeleviry: Perevozka = { name: 'Есть в наличии' };
  methodsZakup: MethodZakup[];
  selectedMethodZakup: MethodZakup = { name: 'Есть в наличии' };
  zakups = [];
  callCentersData: CallCenter[];
  statuses: SelectItem[];
  clonedZakup: { [s: string]: CallCenter } = {};
  zakupId: string;

  constructor(
    private callCenterService: CallCenterService,
    private messageService: MessageService
  ) {
    this.statusesZakup = [
      { name: 'Есть в наличии' },
      { name: 'Алтернатива' },
      { name: 'Нет в наличии' },
      { name: 'Есть на складе' },
    ];
    this.deliveries = [
      { name: 'Отправили за товаром' },
      { name: 'Привезли товар' },
      { name: 'Товар доставлен' },
    ];
    this.methodsZakup = [
      { name: '1 к 1' },
      { name: 'Комби оплата' },
      { name: 'Списание' },
      { name: 'ЕНП (без ндс)' },
      { name: 'Найти в базе 1с' },
      { name: 'Наличка' },
      { name: 'Нал (Приход не нужен)' },
      { name: 'ОКП' },
    ];
  }

  ngOnInit() {
    this.callCenterService
      .getCallCenters()
      .subscribe((data) => (this.callCentersData = data.filter(callCenter => callCenter.payMethod != "")));

    console.log(this.callCentersData);
  }

  onSubmit(callcenter) {
    console.log(callcenter);
    const upData: CallCenter = {
      id: callcenter._id,
      deliver: this.selectedDeleviry.name,
      methodZakup: this.selectedMethodZakup.name,
      statusZakup: this.selectedStatusZakup.name,
      zakupId: this.zakupId,
    };
    console.log(upData)
      this._updateData(upData);
  }

  onRowEditInit(callcenter: CallCenter) {
    this.clonedZakup[callcenter.id] = { ...callcenter };
  }

  onRowEditSave(callcenter: CallCenter) {
    if (callcenter) {
      delete this.clonedZakup[callcenter.id];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Zakup Data is updated',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Zakup Data is not updated',
      });
    }
  }

  onRowEditCancel(callcenter: CallCenter, index: number) {
    this.callCentersData[index] = this.clonedZakup[callcenter.id];
    delete this.callCentersData[callcenter.id];
  }



  private _updateData(callCenter: CallCenter) {
    this.callCenterService.updateZakupData(callCenter).subscribe(
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
