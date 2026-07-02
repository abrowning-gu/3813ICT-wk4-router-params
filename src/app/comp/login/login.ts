import { Component, inject,OnInit,signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Counter } from '../../services/counter';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Loginrequest,LoginResponse } from '../../interfaces/loginrequest';
import { environment } from '../../../environments/environment.development';



@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  route = inject(ActivatedRoute);
  counter = inject(Counter);
  auth = inject(Auth);
  email:string="";
  pwd:string = "";
  userid:string  = "";
  usernum:number = 0;
  count:number = 0;
  sub:Subscription = new Subscription();
  message = signal('');
  messageType : 'success' | 'fail'| null = null;
  logindemo = environment.logindemo;
 

  ngOnInit(){
   // this.userid = this.route.snapshot.params['id'];
    this.count = this.counter.incrementCounter();


    this.sub = this.route.paramMap
    .subscribe(params=>{
      this.userid = params.get('id') ?? '';
      this.usernum = this.counter.incrementUsercounter();
      this.email = "";
      this.pwd = "";
    });
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }

  }
  btnSubmit(){
    this.auth.login(
      { 
        email: this.email,
        pwd: this.pwd,
        userId: this.userid
    }
    ).subscribe({
        next:(response:LoginResponse)=>{
         
          this.message.set(response.message);
          console.log(this.message());
          if(response.valid == true){
             this.messageType = 'success';
             
            setTimeout(() => {
                this.message.set("") ;
                this.messageType = null;
            },3000);

         
          }else{
            this.messageType = 'fail';
            setTimeout(() => {
                this.message.set("") ;
                this.messageType = null;
            },3000);
          }
        },
       error:(err)=>{
        console.log('error response ',  err);
        
        }
    })

  }
}
