import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent implements OnInit {

  status = ['normal', 'Sale', 'Out of stock']
  _id = this.route.snapshot.paramMap.get('id') || "";
  isFetching = false
  selectedFile2: File;
  isFetchingImg: boolean;
  baseURL: any = "https://amnesia-skincare.herokuapp.com/api"
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private http: HttpClient,
    private imageService: ImageService
  ) { }
  product: any = {
    name: "",
    describtion: "",
    status: "",
    current_price: 0,
    old_price: 0,
    image:""
  }
  ngOnInit(): void {
    this.isFetching = true;
    this._id = this.route.snapshot.paramMap.get('id') || "";
    console.log(this._id)
    this.productService.getProductInfo(this._id).subscribe(
      (res: any) => {
        console.log(res)
        this.isFetching = false;
        this.product = res.product;
        console.log(this.product.image)
      },
      err => {
        console.log(err);
        this.isFetching = false;
        this.router.navigate(['dashboard/products'])
      }
    );
  }
  onUpload(event) {
    // console.log(event);
    this.selectedFile2 = <File>event.target.files[0]
  }
  /*save*/
  save(imageInput) {
    let { name, current_price, old_price, description, status } = this.product;
    console.log(name, current_price, old_price, description)
    this.productService.editProduct(this._id, { name, current_price, old_price, description, status })
      .subscribe(
        (res: any) => {
          console.log(res)
          console.log(this.product)
          console.log(localStorage.getItem('token'))
          this.isFetchingImg = true
          console.log(this.product.image , imageInput?.files[0]?.name)
          console.log(imageInput.files)
          if(this.product?.image != imageInput?.files[0]?.name && imageInput?.files?.length !=0){
            this.processFile(imageInput)
          }
          this.router.navigate(['dashboard/products'])
        },
        err => {
          console.log(err)
          this.router.navigate(['dashboard/products'])
        }
      )
  }
  selectedFile: ImageSnippet;
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(this._id, this.selectedFile.file).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        })
    });

    reader.readAsDataURL(file);
  }
  /*cancel*/
  cancel() {
    this.router.navigate(['dashboard/products'])
  }

}
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}