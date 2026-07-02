import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loginrequest,LoginResponse } from '../interfaces/loginrequest';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})


export class Auth {
  httpclient= inject(HttpClient);
 

  login(credentials:Loginrequest){
    return this.httpclient.post<LoginResponse>(environment.ServerURL+"/api/login",credentials);
  }
}