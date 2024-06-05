import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval,filter, map, observeOn } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy{
  private firstSubscribtion!:Subscription;
  constructor(){
  }
  
  ngOnInit()
  {
    // this.firstSubscribtion=interval(1000).subscribe((count)=>{
      //   console.log(count);
      // })
      const customIntervalObservable = new Observable<number>((observer) => {
        let count = 0;
       setInterval(() => {
          observer.next(count);
          if(count===2)
            {
              observer.complete()
            }
          if(count>3)
            {
              observer.error(new Error("Counter is greater than 3"))
            }
          count++;
        }, 1000);
  
        // Clean up interval on unsubscribe
        // return () => {
        //   clearInterval(intervalId);
        // };
      });
      this.firstSubscribtion = customIntervalObservable.pipe(filter(data=>{return data>0}),map((data:number)=>{
        return 'Round '+(data+1);
      })).subscribe((data)=>{
        console.log(data);
      },error=>{
        console.log(error);
        alert(error.message)
      },()=>{
        console.log("Completed");
        
      })

  }
  ngOnDestroy():void
  {
    this.firstSubscribtion.unsubscribe()
  }
}
