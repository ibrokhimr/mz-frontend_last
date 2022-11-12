import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Product,
  ProductsService,
} from '@variant-bor-uz-frontend/products';
import { saveAs } from 'file-saver';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'variant-bor-uz-frontend-scoring-form',
  templateUrl: './scoring-form.component.html',
  styles: [],
})

export class ScoringFormComponent implements OnInit, OnDestroy {

  endSubs$: Subject<any> = new Subject();

  isSubmitted = false;
  form: FormGroup;
  editMode = false;
  categories = [];
  currentScoringID: string;
  uploadedFiles: any[] = [];
  statuses = [];
  scoring: any = [];
  currentRoute: string;
  selectedStatus = '';
  limitMoney = '';
  document1 = '';
  document2 = '';
  imageDisplay: string | ArrayBuffer;
  status1Step;

  dataStatuses = [];
  // selectedDataStatus;

  constructor(
    private scoringService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productsService: ProductsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.statuses = [
      // { status: 'Choose' },
      { status: 'Успешнно' },
      { status: 'Отказано' }, //отказано
    ];
    this.currentRoute = router.url.split('/')[2];

    this.dataStatuses = [
      { status: 'Выберите', value: '' },
      { status: 'Верные данные', value: 'Верные данные' },
      { status: 'Неверные данные', value: 'Неверные данные' },
    ]
  }

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
    this._getScoringById(this.currentScoringID);
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  //ishlatilmagan
  onSubmit() {
    console.log(this.currentScoringID);
    // const sendData = {
    //   id: this.currentRoute,
    //   statusAdmin: this.selectedStatus.status,
    //   limitMoney: this.limitMoney,
    // };

    const scoringFormData = new FormData();
    Object.keys(this.scoringForm).map((key) => {
      scoringFormData.append(key, this.scoringForm[key].value);
    });

    console.log(scoringFormData);
    this._updateScoring(scoringFormData);
  }

  onFileUpload1(event: any) {
    const file = event.target.files[0];
    this.document1 = file.name;

    console.log(file);
    if (file) {
      const fileReader = new FileReader();
      this.form.patchValue({ document1: file });
      this.form.get('document1').updateValueAndValidity();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  onFileUpload2(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.document2 = file.name;
    console.log(file);
    if (file) {
      const fileReader = new FileReader();
      this.form.patchValue({ document2: file });
      this.form.get('document2').updateValueAndValidity();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      limitMoney: ['', Validators.required],
      statusAdmin: ['', Validators.required],
      document1: ['', Validators.required],
      document2: ['', Validators.required],
      // passportSeries: ['', Validators.required],
      // phoneNumber: ['', Validators.required],
      // date: ['', Validators.required],
      // productName: ['', Validators.required],
      // productPrice: ['', Validators.required],
      // term: ['', Validators.required],
      // amount: ['', Validators.required],
      selectedDataStatus: [''],
    });
  }

  // private _getScoring(){
  //   this.scoringService.getScoring().subscribe(scoring=>{
  //     this.scoring=scoring
  //   })
  // }

  private _getScoringById(scoringId: string) {
    this.scoringService
      .getScoringById(scoringId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(scoring => {
        this.scoring = scoring
      })
  }
  private _updateScoring(data: FormData) {
    this.scoringService
      .putScoringMoney(data, this.currentScoringID)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Document is updated!',
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
            detail: 'Document is not updated!',
          });
        }
      );
  }


  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentScoringID = params.id;
        this.scoringService.getScore(params.id).subscribe((scoring) => {
          this.scoringForm.limitMoney.setValue(scoring.limitMoney);
          this.scoringForm.statusAdmin.setValue(scoring.statusAdmin);
          // this.scoringForm.statusStep.setValue(scoring.statusStep);
          // this.scoringForm.date.setValue(scoring.date);
          // this.scoringForm.phoneNumber.setValue(scoring.phoneNumber);
          // this.scoringForm.code.setValue(scoring.codeConfirmation);
          // this.scoringForm.productName.setValue(scoring.productName);
        });
      }
    });
  }

  onCancel() {
    this.location.back();
  }

  get scoringForm() {
    return this.form.controls;
  }

  downloadFile(doc: string) {
   this._downloadFiles(doc)
  }

  private _downloadFiles(doc:string){
    this.scoringService
    .downloadFile(doc, this.currentScoringID)
    .pipe(takeUntil(this.endSubs$))
    .subscribe(
      (data: Blob | MediaSource) => {
        let downloadURL = window.URL.createObjectURL(data);
        saveAs(downloadURL);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Документ не найден!',
        });
      }

    );
  }


  submit1Step() {
    const stepStatus = this.scoringForm.selectedDataStatus.value;
    if (stepStatus === 'Верные данные') {
      const data_1: any = {
        // id: this.currentScoringID,
        statusAdmin: 'Ожидания кода',
        step: 2,
      };
      this._editStepStatus(data_1);
      timer(1000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    }
    if (stepStatus === 'Неверные данные') {
      const data_1: any = {
        // id: this.currentScoringID,
        statusAdmin: 'Ошибка данных, введите данные повторно',
        step: 1,
      };
      this._editStepStatus(data_1);
      timer(1000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    }
    if (stepStatus === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Info Message',
        detail: `статус не выбран`,
      });
      return;
    }

    // this._editStepStatus(data_1);
    this.messageService.add({
      severity: 'success',
      summary: 'Info Message',
      detail: `Отлично`,
    });
  }

  submit2Step() {
    const stepStatus = this.scoringForm.selectedDataStatus.value;
    if (stepStatus === 'Верные данные') {
      const data_2: any = {
        // id: this.currentScoringID,
        statusAdmin: 'Ожидания ответа',
        step: 4,
      };
      this._editStepStatus(data_2);
      return;
    }
    if (stepStatus === 'Неверные данные') {
      const data_2: any = {
        // id: this.currentScoringID,
        statusAdmin: 'Неправилный код, Снова Ожидается!',
        step: 2,
      };
      this._editStepStatus(data_2);
      timer(1000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    }
    if (stepStatus === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Info Message',
        detail: `статус не выбран`,
      });
      return;
    }

    // this._editStepStatus(data_1);
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Info Message',
    //   detail: `Отлично`,
    // });
  }

  submit3Step() {
    const stepStatus = this.scoringForm.statusAdmin.value;

    if (stepStatus === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Info Message',
        detail: `статус не выбран`,
      });
      return;
    }
    const scoringFormData = new FormData();
    Object.keys(this.scoringForm).map((key) => {
      scoringFormData.append(key, this.scoringForm[key].value);
      // console.log(key);
      // console.log(this.scoringForm[key].value)
    });

    if (stepStatus === 'Отказано') {
      scoringFormData.append('complatedAt', new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }))
      scoringFormData.append('step', '5')
      this._updateScoring(scoringFormData);
      timer(1000);
      return;
    }
    if (stepStatus === 'Успешнно') {
      // scoringFormData.append('complatedAt',new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }))
      scoringFormData.append('step', '6')
      this._updateScoring(scoringFormData);
      timer(1000);
    }

    // this._updateScoring(scoringFormData);
    // this.messageService.add({ severity: 'success', summary: 'Info Message', detail: `Отлично` });
  }
  submit4Step() {
    const scoringFormData = new FormData();

    Object.keys(this.scoringForm).map((key) => {
      scoringFormData.append(key, this.scoringForm[key].value);
      // console.log(key);
      // console.log(this.scoringForm[key].value)
    })
    scoringFormData.append('step', '8')
    scoringFormData.set('statusAdmin', 'Оформление')
    this._updateScoring(scoringFormData);

    timer(1000);
  }

  private _editStepStatus(data: any) {
    console.log(data);
    this.scoringService
      .updateScoring(data, this.currentScoringID)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Document is updated!',
          });
          this._getScoringById(this.currentScoringID);
          // timer(2000)
          //   .toPromise()
          //   .then(() => {
          //     this.location.back();
          //   });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Document is not updated!',
          });
        }
      );
  }

  onsendArchive() {
    this._archiveDocument(this.currentScoringID);

    // this.location.back();
  }

  private _archiveDocument(scoringId: string) {
    // let scoringDocument = this.scoringService.getScoringById(scoringId);

    this.scoringService
      .moveToArchive(scoringId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(

        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Document is archived!',
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
            detail: 'Document is not archived!',
          });
        }
      );


  }

  submitLastStep() {
    const stepStatus = this.scoringForm.selectedDataStatus.value;
    console.log(stepStatus);
    if (stepStatus === 'Верные данные') {
      const data_1: any = {
        // id: this.currentScoringID,
        statusAdmin: 'Готово',
        step: 11,
      };
      this._editStepStatus(data_1);
      timer(1000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    }
    if (stepStatus === 'Неверные данные') {
      const data_1: any = {
        // id: this.currentScoringID,
        statusAdmin: 'Неправильные документы',
        step: 8,
      };
      this._editStepStatus(data_1);
      timer(1000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    }
    if (stepStatus === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Info Message',
        detail: 'статус не выбран',
      });
      return;
    }

    // this._editStepStatus(data_1);
    this.messageService.add({
      severity: 'success',
      summary: 'Info Message',
      detail: 'Отлично',
    });
  }
}
