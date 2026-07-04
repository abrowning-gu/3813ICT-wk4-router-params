export interface Loginrequest {
    email:string;
    pwd:string;
    userId:string|null;
}

export interface LoginResponse {
  valid:boolean,
  message: string;
  
}
