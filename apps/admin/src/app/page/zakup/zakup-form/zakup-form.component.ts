import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, Product, ProductsService } from '@variant-bor-uz-frontend/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'variant-bor-uz-frontend-zakup-form',
  templateUrl: './zakup-form.component.html',
  styles: [
  ]
})
export class ZakupFormComponent implements OnInit {

  isSubmitted=false
 form:FormGroup
 editMode=false
 imageDisplay:string | ArrayBuffer
 categories=[]
 currentProductID:string


  constructor(
    private categoriesService:CategoriesService,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private productService:ProductsService,
    private location:Location,
    private route:ActivatedRoute,
    private productsService:ProductsService
  ) { }

  ngOnInit(): void {
    this._initForm()
    this._getCategories()
    this._checkEditMode()
}



  onSubmit(){
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const productFormData=new FormData()
    Object.keys(this.productForm).map((key)=>{
      productFormData.append(key,this.productForm[key].value )
    })
    if(this.editMode){
      this._updateProduct(productFormData)
    }else{
    this._addProduct(productFormData)
    }


  }
  onImageUpload(event:any){
    const file=event.target.files[0]
    if(file){
      this.form.patchValue({image:file})
      this.form.get('image').updateValueAndValidity()
      const fileReader=new FileReader()
      fileReader.onload=()=>{
        this.imageDisplay=fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }
  private _initForm(){
      this.form=this.formBuilder.group({
        name:['',Validators.required],
        brand:['',Validators.required],
        price:['',Validators.required],
        category:['',Validators.required],
        countInStock:['',Validators.required],
        description:['',Validators.required],
        richDescription:[''],
        image:['',Validators.required],
        isFeatured:[false]

      })
  }
  private _getCategories(){
    this.categoriesService.getCategories().subscribe(categories=>{
      this.categories=categories
    })
  }


  private _updateProduct(productFormData:FormData){
    this.productsService.updateProduct(productFormData,this.currentProductID).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
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
          detail: 'Product is not updated!'
        });
      }
    );
  }


  private _addProduct(productData:FormData){
    this.productService.createProduct(productData).subscribe(
      (product:Product) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product ${product.name} is Created`,
      });
      timer(2000).toPromise().then(done=>{
        this.location.back()
      })
    },(error)=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product is not Created',
      });
    });
  }


  private _checkEditMode(){
    this.route.params.subscribe(params=>{
      if(params.id){
        this.editMode=true
        this.currentProductID=params.id
        this.productService.getProduct(params.id).subscribe(product=>{
          this.productForm.name.setValue(product.name)
          this.productForm.category.setValue(product.category.id)
          this.productForm.brand.setValue(product.brand)
          this.productForm.price.setValue(product.price)
          this.productForm.countInStock.setValue(product.countInStock)
          this.productForm.isFeatured.setValue(product.isFeatured)
          this.productForm.description.setValue(product.description)
          this.productForm.richDescription.setValue(product.richDescription)
          this.imageDisplay=product.image
        })
      }
    })
  }

  onCancel(){
    this.location.back();
  }


  get productForm() {
    return this.form.controls;
  }

}
