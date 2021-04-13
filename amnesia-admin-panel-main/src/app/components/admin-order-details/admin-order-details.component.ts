import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service'


@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService:OrdersService
  ) { }

  /*var*/
  order
  subscriber
  _id = this.route.snapshot.paramMap.get('id') || "";
  orderInfo:any
  totalPrice=0;
  isFetching=false;
  /* order details*/
  orderDetails(id) {
    this.router.navigate([`order/details/${id}`])
  }
  
  /* oninit */
  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id') || "";
    this.isFetching = true;
    this.orderService.displayOneOrder(this._id).subscribe(
      (res:any)=>{
        console.log(res)
        this.orderInfo=res.order;
        this.orderInfo.products.map((product)=>{
          this.totalPrice += (product.quantity * (product.productId?.current_price || 0));
        })
        let withOutNull = this.orderInfo.products.filter((product)=>product.productId!=null)
        console.log(withOutNull)
        this.orderInfo.products = withOutNull;
        this.isFetching = false;
        console.log(this.totalPrice)
      },
      (err)=>{
        this.isFetching = false;
        console.log(err)
        this.totalPrice=0;
        this.orderInfo={
          products:[],
          _id:"N/A",
          orderStatus:"N/A",
          address:"N/A",
          userId:{
            email:"N/A",
            address:"N/A",
            phones:"N/A",
            firstname:"N/A",
            lastname:"N/A"
          }
        }

      }
    )
  }

}
