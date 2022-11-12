import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Dillers } from '@variant-bor-uz-frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-dillers',
  templateUrl: './dillers.component.html',
  styles: [],
})
export class DillersComponent implements OnInit {
  dillers: Dillers[] = [];
  dil = '';
  message: string;

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.currentMessage.subscribe(
      (message) => (this.message = message)
    );
    this._getDiller();
  }

  private _getDiller() {
    this.categoriesService.getDillers().subscribe((diller) => {
      this.dillers = diller;
    });
  }

  exactDiller(diller: string) {
    this.dil = diller;
    this.categoriesService.changeMessage(this.dil);
  }

  updateDiller(dillerId: string) {
    this.router.navigateByUrl(`dillers/form/${dillerId}`);
  }

  deleteDiller(dillerId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Diller?',
      header: 'Delete Diller',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteDiller(dillerId).subscribe(
          (response) => {
            this._getDiller();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Diller is Deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Diller is not Deleted',
            });
          }
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      reject: (type) => {},
    });
  }
  //   exportPdf() {
  //     import("jspdf").then(jsPDF => {
  //         import("jspdf-autotable").then(x => {
  //             const doc = new jsPDF.default(0,0);
  //             doc.autoTable(this.exportColumns, this.dillers);
  //             doc.save('products.pdf');
  //         })
  //     })
  // }




}
