import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Banner } from 'libs/products/src/lib/models/banner';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import {
  CategoriesService,
  ProductsService,
} from '@variant-bor-uz-frontend/products';
@Component({
  selector: 'banner-form',
  templateUrl: './banner-form.component.html',
  styles: [],
})
export class BannerFormComponent implements OnInit {
  isSubmitted = false;
  form: FormGroup;
  editMode = false;
  imageDisplay: string | ArrayBuffer;
  categories = [];
  currentBannerID: string;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productService: ProductsService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const bannerFormData = new FormData();
    Object.keys(this.bannerForm).map((key) => {
      bannerFormData.append(key, this.bannerForm[key].value);
    });
    if (this.editMode) {
      this._updateBanner(bannerFormData);
    } else {
      this._addBanner(bannerFormData);
    }
  }
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      isDiscount: [false]
    });
  }


  private _updateBanner(bannerFormData: FormData) {
    this.productService
      .updateBanner(bannerFormData, this.currentBannerID)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Banner image is updated!',
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
            detail: 'Banner image is not updated!',
          });
        }
      );
  }

  private _addBanner(bannerData: FormData) {
    this.productService.createBanner(bannerData).subscribe(
      (banner: Banner) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Banner ${banner.name} is Created`,
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
          detail: 'Banner is not Created',
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentBannerID = params.id;
        this.productService.getBanner(params.id).subscribe((banner) => {
          this.bannerForm.name.setValue(banner.name);
          // this.bannerForm.image.setValue(banner.image);
          this.imageDisplay = banner.image;
        });
      }
    });
  }

  onCancel() {
    this.location.back();
  }

  get bannerForm() {
    return this.form.controls;
  }
}
