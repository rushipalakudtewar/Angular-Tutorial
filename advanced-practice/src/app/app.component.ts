import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'advanced-practice';
  userActivated:any=false;
  isLoggedin= true;
  private activatedSub!:Subscription;
  constructor(private userService:UserService){}
  ngOnInit()
  {
    this.activatedSub = this.userService.activatedEmmiter.subscribe(didActive => {
      this.userActivated=didActive;
    })
   
    
    
    
  }
  ngOnDestroy():void
  {
    this.activatedSub.unsubscribe()
  }

  
  
}
