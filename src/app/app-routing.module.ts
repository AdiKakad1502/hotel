import { RestaurantDashComponent } from './restaurant-dash/restaurant-dash.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path: 'login',component: LoginComponent
  },
  {
    path: 'siignup',component:SignupComponent
  },
  {
    path:'restaurant',component:RestaurantDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
