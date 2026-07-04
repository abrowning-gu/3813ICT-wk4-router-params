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
   
    this.count = this.counter.incrementCounter();
    //get the userid when the component loads.
    // this.userid = this.route.snapshot.params['id'];

    //use a subscription to continue to monitor changes in the user id parameter.
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

  //Event handler for form submit
  btnSubmit(){
    //call login function from Auth service.
    this.auth.login(
      { 
        email: this.email,
        pwd: this.pwd,
        userId: this.userid
    }
    ).subscribe({
        next:(response:LoginResponse)=>{
         
          this.message.set(response.message);
        
          if(response.valid == true){
             this.messageType = 'success';
            
             //hide message after 3 seconds
            setTimeout(() => {
                this.message.set("") ;
                this.messageType = null;
            },3000);

         
          }else{
            this.messageType = 'fail';
            //hide message after 3 seconds
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
