import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-admin-all-orders',
  templateUrl: './admin-all-orders.component.html',
  styleUrls: ['./admin-all-orders.component.css']
})
export class AdminAllOrdersComponent implements OnInit {


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
  status = "pending";
  showOrders = false;
  orderId = "";
  /*ctor*/
  constructor(
    private orderService: OrdersService,
    private router:Router,
    private route: ActivatedRoute) {
  }

  getData(status, skip, limit) {
    console.log(status, skip, limit)
    this.loading = true;
    this.appear = false;
    this.skipGlobal = skip;
    this.isFetching = true;
    this.orderService.getAllorders(status, limit, skip).subscribe(
      (res: any) => {
        console.log(res)
        this.loading = false;
        this.appear = true;
        this.allData = res.orders;
        this.allData.map((order,index)=>{
          this.allData[index].totalPrice = 0;
          let date = new Date(order?.createdAt);
          let year = date.getFullYear();
          let month:any = date.getMonth()+1;
          let dt:any = date.getDate();

          if (dt < 10) {
            dt = '0' + dt;
          }
          if (month < 10) {
            month = '0' + month;
          }

          order.createdAt = year+'-' + month + '-'+dt;
          
          order.products.map((product)=>{
            this.allData[index].totalPrice += (product.quantity * (product.productId?.current_price || 0));
          })
        })
        /// calc the total price here given the all data;
        /**
         for loop of all Data and calculate the total price
         */
        console.log(this.allData)
        this.obj = res.orders;
        this.arrnoOfPages = [];
        this.noOfProducts = res.length;
        this.noOfPages = Math.ceil(res.length / 5);
        for (let i = 1; i <= this.noOfPages; i++) {
          this.arrnoOfPages.push(i);
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
  updateProductStatus(_id,newStatus){
    console.log({_id,newStatus});
    this.orderService.updateOrder(_id,newStatus).subscribe(
      (res:any)=>{
        console.log(res);
        document.getElementById(_id).style.display="none";
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  changeStatus(status) {
    this.showOrders = true;
    this.status = status;
    this.getData(status, 0, 5)
  }
  paginate(val) {
    this.getData(this.status, (((val * 5) - 5)), (val * 5));
    this.skipGlobal = (val * 5) - 5
  }
  orderDetails(id) {
    this.router.navigate([`dashboard/order/details/${id}`])
  }

  ngOnInit(): void {
  }

}
