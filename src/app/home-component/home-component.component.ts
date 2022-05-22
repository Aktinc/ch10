import { HttpClient } from '@angular/common/http';
import { Component, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[A-Za-z]/) || control.value.match(/\s+/)) {
    return { invalidUser: true };
  } else {
    return {};
  }
}
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  myForm: FormGroup;
  name: AbstractControl;
  password: AbstractControl;

  baseUrl = 'http://127.0.0.1:8080/'

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.myForm = this.fb.group(
      {
        'name': ["", Validators.compose([Validators.required, userNameValidator, Validators.minLength(3)])],
        'password': ["", Validators.compose([Validators.required, Validators.minLength(3)])]
      }
    );
    this.name = this.myForm.controls['name'];
    this.password = this.myForm.controls['password'];
  }

  ngOnInit(): void {

  }

  //登录界面
  login() {
    const formData = new FormData();
    Object.keys(this.myForm.value).forEach((key) => {
      formData.append(key, this.myForm.value[key]);
    });
    this.httpClient.post(this.baseUrl + 'user/login', formData, { withCredentials: true }).subscribe(
      (val: any) => {
        if (val.success) {
          this.router.navigateByUrl("login")
          console.log("登录成功");
        } else {
          alert(val.message);
        }
      }
    );

  }
}

