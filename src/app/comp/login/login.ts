import { Component, inject,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Counter } from '../../services/counter';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  route = inject(ActivatedRoute);
  counter = inject(Counter);

  userid:string | null = null;
  usernum:number = 0;
  count:number = 0;
  sub:Subscription = new Subscription();
 

  ngOnInit(){
    this.userid = this.route.snapshot.params['id'];
    this.count = this.counter.incrementCounter();


    // this.sub = this.route.paramMap
    // .subscribe(params=>{
    //   this.userid = params.get('id') ?? '';
    //   this.usernum = this.counter.incrementUsercounter();
    // });
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }

  }
}
