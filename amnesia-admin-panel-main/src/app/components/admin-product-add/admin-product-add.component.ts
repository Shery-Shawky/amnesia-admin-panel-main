import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {

  status = ['normal', 'Sale', 'Out of stock']
  isFetching = false
  imageRequired = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private imageService: ImageService
  ) { }
  product: any = {
    name: "",
    describtion: "",
    status: "normal",
    current_price: 0,
    old_price: 0
  }
  imageFileName = "";
  ngOnInit(): void {
  }
  selectedFile: ImageSnippet;
  processFile(imageInput: any, id) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.uploadImage(id, this.selectedFile.file).subscribe(
        (res) => {
          console.log(res)
          this.imageRequired = true;
        },
        (err) => {
          console.log(err)
          this.imageRequired = false;
        })
    });

    reader.readAsDataURL(file);
  }
  /*add*/
  add(imageInput) {
    console.log(imageInput.files.length)
    this.product;
    if (imageInput?.files?.length > 0) {
      this.productService.addProduct(this.product)
        .subscribe(
          (res: any) => {
            console.log(res)
            let id = res.newProduct?._id
            this.imageRequired = false;
            this.processFile(imageInput, id)
            this.router.navigate(['dashboard/products'])
          },
          err => {
            console.log(err)
            this.router.navigate(['dashboard/products'])
          }
        )
    } else {
      this.imageRequired = true;
    }
  }
  /*cancel*/
  cancel() {
    this.router.navigate(['dashboard/products'])
  }

}
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
