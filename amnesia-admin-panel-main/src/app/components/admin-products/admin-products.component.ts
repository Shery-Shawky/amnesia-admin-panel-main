import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  /* var */
  isFetching = false
  noOfPages: number;
  arrnoOfPages: number[] = [];
  allData: any = [];
  obj: any[] = [];
  loading: boolean = true;
  appear: boolean = false;
  skipGlobal
  limitGlobal
  noOfProducts = 0
  pname="";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
  }
  
  ngOnInit(): void {
    this.getData(this.pname,0, 15)
  }
  getData(pname,skip, limit) {
    console.log(status, skip, limit)
    this.loading = true;
    this.appear = false;
    this.skipGlobal = skip;
    this.isFetching = true;
    this.productService.getAllProductsApi(pname,skip, limit).subscribe(
      (res: any) => {
        console.log(res)
        this.loading = false;
        this.appear = true;
        this.allData = res.products;
        this.allData.map(((product, index) => {
          if (product.image.length == 0) {
            this.allData[index].image = "http://learnmongodbthehardway.com/images/originals/shopping_cart_racing.png";
            return;
          }
          this.allData[index].image = `https://amnesia-skincare.herokuapp.com/api/images/show/${product.image}`;
        }))
        console.log(this.allData)
        this.obj = res.products;
        this.arrnoOfPages = [];
        if(this.pname.length==0){
          this.noOfProducts = res.length;
          this.noOfPages = Math.ceil(res.length / 15);
          for (let i = 1; i <= this.noOfPages; i++) {
            this.arrnoOfPages.push(i);
          }
        }else{
          this.noOfProducts = this.allData.length;
          this.noOfPages = Math.ceil(this.noOfProducts / 15);
          for (let i = 1; i <= this.noOfPages; i++) {
            this.arrnoOfPages.push(i);
          }
        }
        this.isFetching = false;
        console.log(this.arrnoOfPages)
      },
      (error) => {
        this.isFetching = false;
        this.loading = false;
        console.log(error)
      }
    )
  }
  paginate(val) {
    this.getData(this.pname,(((val * 15) - 15)), (val * 15));
    this.skipGlobal = (val * 15) - 15
  }
  searching(){
    setTimeout(()=>{
      console.log("searching")
      this.getData(this.pname,0, 15)
    },500)
  }
  /*add*/
  add() {
    this.router.navigate(['dashboard/add/product'])
  }

  /*edit*/
  edit(_id) {
    this.router.navigate([`dashboard/edit/product/${_id}`])
  }

  /*delete*/
  delete(_id) {
    console.log(_id);
    this.productService.deleteProduct(_id).subscribe(
      (res: any) => {
        console.log(res);
        let data = this.allData.filter(product => product._id != _id);
        this.allData = data;
        document.getElementById(_id).parentNode.removeChild(document.getElementById(_id));
      },
      err => {
        console.log(err);
      }
    )
  }

}
