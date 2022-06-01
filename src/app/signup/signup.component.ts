import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile:[''],
      password: ['']
    })
  }
  signUp(){
    this.http.post<any>("https://localhost:3000/signup",this.signupForm.value).subscribe(res => {
      alert("Registration successful");
      this.signupForm.reset();
      this.router.navigate(['login'])
    },
    err=>{
      alert("Something wrong has occurred")
    })
  }

}
