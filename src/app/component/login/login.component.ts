import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: this.formBuilder.control("", Validators.required),
      password: this.formBuilder.control("", Validators.required),
    })
  }

  handleLogin() {
    console.log(this.formLogin.value)
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username, password)
      .then(res => {
        this.router.navigateByUrl("/admin")
      })
      .catch(error => {
        this.errorMessage=error;
      })

    // if (this.formLogin.value.username == "admin" && this.formLogin.value.password == "1234")
    //   this.router.navigateByUrl("/admin");
  }
}
