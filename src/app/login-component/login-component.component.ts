import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {
  baseUrl = 'http://127.0.0.1:8080/';
  users$!: User[];
  myForm: FormGroup;
  name: AbstractControl;
  password: AbstractControl;
  name_alter: AbstractControl;
  a!: boolean;
  add: boolean;
  mode1: boolean;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.myForm = this.fb.group(
      {
        'name': [""],
        'password': [""],
        'name_alter': [""]
      }
    );
    this.name = <AbstractControl>this.myForm.controls['name'];
    this.password = <AbstractControl>this.myForm.controls['password'];
    this.name_alter = <AbstractControl>this.myForm.controls['name_alter']
    this.add = false;
    this.mode1 = true;
  }
  exit() {
    const formData = new FormData();
    this.httpClient.post(this.baseUrl + 'user/logout', formData, { withCredentials: true }).subscribe(
      (val: any) => {
        if (val.success) {
          console.log("成功退出");
        } else {
          alert(val.message);
        }
      }
    );
    this.router.navigateByUrl("/home")
  }
  ngOnInit(): void {
    this.httpClient.get(this.baseUrl + 'user/', { withCredentials: true }).subscribe(
      (val: any) => {
        if (val.success) {
          this.users$ = val.data;
          this.a = false;
        } else {
          this.a = true;
        }
      }
    );
    console.log(this.users$);
  }
  add_show() {
    this.mode1 = true;
    this.add = true;
  }
  add_hide() {
    this.mode1 = true;
    this.add = false;
  }
  mode1_show() {
    this.add = true;
    this.mode1 = false;
  }
  //用户添加
  userAdd() {
    const formData = new FormData();
    Object.keys(this.myForm.value).forEach((key) => {
      formData.append(key, this.myForm.value[key]);
    });
    this.httpClient.post(this.baseUrl + 'user/home/add', formData, { withCredentials: true }).subscribe(
      (val: any) => {
        if (val.success) {
          this.ngOnInit();
          console.log("添加成功");
        } else {
          alert(val.message);
        }
      }
    );
  }

  //用户删除
  userDelete() {
    const formData = new FormData();
    formData.append("name", this.myForm.controls["name"].value);
    this.httpClient.post(this.baseUrl + 'user/home/delete', formData, { withCredentials: true }).subscribe(
      (val: any) => {
        if (val.success) {
          this.ngOnInit();
          console.log("删除成功");
        } else {
          alert(val.message);
        }
      }
    );
  }

  userAlter() {
    const formData = new FormData();
    Object.keys(this.myForm.value).forEach((key) => {
      formData.append(key, this.myForm.value[key]);
    });
    this.httpClient.post(this.baseUrl + 'user/home/alter', formData, { withCredentials: true }).subscribe(
      (val: any) => {
        if (val.success) {
          this.ngOnInit();
          console.log("修改成功");
        } else {
          alert(val.message);
        }
      }
    );
  }

  inquire() {
    const formData = new FormData();
    formData.append("name", this.myForm.controls["name"].value);
    this.httpClient.post(this.baseUrl + 'user/home/inquire', formData, { withCredentials: true }).subscribe(
      (val: any) => {
        if (val.success) {
          this.users$ = val.data;
          console.log("查询成功");
        } else {
          alert(val.message);
        }
      }
    );
  }
}
export class User {
  id!: string;
  name!: string;
  password!: string;
}