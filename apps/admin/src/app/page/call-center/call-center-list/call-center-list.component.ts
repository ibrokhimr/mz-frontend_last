/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallCenterService, ProductsService } from '@variant-bor-uz-frontend/products';

import { CallCenter } from 'libs/products/src/lib/models/callCenter';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-call-center-table',
  templateUrl: './call-center-list.component.html',
  styles: [
  ]
})
export class CallCenterListComponent implements OnInit {

  centerDatas:CallCenter[]=[]
  constructor(
    private callCenterService:CallCenterService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router:Router
  ) { }

  ngOnInit(): void {
   this._getCallCenterData()
  }


  deleteCenterData(centerId:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Data?',
      header: 'Delete Data',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.callCenterService.deleteCenterData(centerId).subscribe(response=>{
          this._getCallCenterData()
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Data is Deleted',
          });
        },(error)=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Data is not Deleted',
          });
        })
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      reject: (type) => {

      }
  });

  }



  updateCenterData(centerId:string){
    this.router.navigateByUrl(`callCenter/form/${centerId}`)
  }


  private _getCallCenterData(){
    this.callCenterService.getCallCenters().subscribe(center=>{
      this.centerDatas=center;
    })
  }
}
