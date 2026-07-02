import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Counter {
  counter:number=0;
  usernum:number = 0;

  incrementCounter():number{
    this.counter = this.counter+1;
    return this.counter;
  }

  incrementUsercounter():number{
    this.usernum = this.usernum + 1;
    return this.usernum;

  }
  
}
