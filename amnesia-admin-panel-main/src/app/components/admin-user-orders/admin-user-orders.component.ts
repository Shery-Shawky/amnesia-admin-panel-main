import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service'


@Component({
  selector: 'app-admin-user-orders',
  templateUrl: './admin-user-orders.component.html',
  styleUrls: ['./admin-user-orders.component.css']
})
export class AdminUserOrdersComponent implements OnInit {

  constructor(
    private myService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this._id = this.route.snapshot.paramMap.get('id') || "";
      this.showAllOrders();
     }

  /*var*/
  orders =[];
  _id="";
  subscriber;
  user={
    email:"N/A"
  };
  totalPriceArr: Array<number> = []
  ordersId: Array<number> = []

  isFetching = false
  // showAllOrders
  orderDetails(id) {
    this.router.navigate([`dashboard/order/details/${id}`])
  }
  showAllOrders() {
    console.log(this.isFetching)
    this.isFetching = true
    this.subscriber = this.myService.displayOrders(this._id)
      .subscribe((res:any) => {
        this.isFetching = false
        console.log(res);
        this.orders =  res.orders
        this.user = res.user[0];
        console.log(this.orders) 


        for (let i = 0; i < this.orders.length; i++) {
          var total = 0;
          var quantity = 0;
          var price = 0;
          for (let j = 0; j < this.orders[i].products.length; j++) {
            quantity = this.orders[i].products[j].quantity;
            price = this.orders[i].products[j].productId?.current_price || 0;
            total += quantity * price
          }
          this.orders[i].totalPrice = total;
          this.totalPriceArr.push(total)
        }
        console.log(this.totalPriceArr)
        console.log(this.ordersId)
      },
        (error) => {
          this.isFetching = false
          console.log(error);
        }
      )
  }


  ngOnInit(): void {
    this.showAllOrders()
  }

}