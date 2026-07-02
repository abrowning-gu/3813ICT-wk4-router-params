import { Routes } from '@angular/router';
import {Home} from './comp/home/home';
import {Login} from './comp/login/login';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },
    {
      path:'login/:id',
        component:Login  
    }
];
