import { ApiService } from './../shared/api.service';
import { RestaurantData } from './restaurant.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData();
  allRestaurantData: any;
  showAdd!: boolean;
  showbtn!: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }
  addRestaurant() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.phone = this.formValue.value.phone;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(
      res => {
        console.log(res);
        alert('Restaurant Records Added Successfully');
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  getAllData() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res;
    });
  }

  deleteResto(data:any) {
this.api.deleteRestaurant(data.id).subscribe(res => {
  alert("Restaurant Records Deleted");
  this.getAllData();
})
  }
  onEditResto(data: any) {
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  onUpdateResto(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.phone = this.formValue.value.phone;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res =>{
      alert("Restaurant updated successfully");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    });
  }
}
