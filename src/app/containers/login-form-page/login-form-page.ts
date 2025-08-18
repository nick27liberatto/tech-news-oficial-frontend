import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form-page.html',
  styleUrl: './login-form-page.scss'
})
export class LoginFormPage {
  
  form:FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit(){
    console.log("submit");
  }

  onGoogleLogin() {
    console.log("Google");
  }

  onGitHubLogin(){
    console.log("Github");
  }

    resetForm(){
    this.form.reset();
  }
}
