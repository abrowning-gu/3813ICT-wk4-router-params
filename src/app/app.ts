import { Component, inject } from '@angular/core';
import { RouterOutlet,RouterLink,Router } from '@angular/router';
import {Nav} from './comp/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  private router = inject(Router);
  navbyurl(id:number){
    this.router.navigateByUrl('/login/' + id);

  }
  navby(id:number){
    this.router.navigate(['/login/', id]);

  }
}
