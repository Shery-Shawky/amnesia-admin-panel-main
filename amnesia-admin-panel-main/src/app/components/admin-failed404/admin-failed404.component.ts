import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-failed404',
  templateUrl: './admin-failed404.component.html',
  styleUrls: ['./admin-failed404.component.css']
})
export class AdminFailed404Component implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigate(['dashboard']);
  }
}
