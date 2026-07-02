export interface Loginrequest {
    email:string;
    pwd:string;
    userId:string;
}

export interface LoginResponse {
  valid:boolean,
  message: string;
  
}
