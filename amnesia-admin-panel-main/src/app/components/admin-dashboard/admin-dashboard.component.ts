import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service'


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private myService: UsersService,
    private router: Router,
    private route:ActivatedRoute
    ) { }

  /* toggle nav */
  toggle() {
    document.getElementById('sidebar').classList.toggle("active");
    document.getElementById('sidebarCollapse').classList.toggle("active");
  }

  /* tabs nav */
  tab: any = 'tab1';
  tab1: any
  tab2: any
  tab3: any
  Clicked: boolean


  onClick(url) {
    this.router.navigate([url])
  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])

  }

}
