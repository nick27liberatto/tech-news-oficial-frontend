import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-form-page.html',
  styleUrl: './register-form-page.scss'
})
export class RegisterFormPage {
  form:FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
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
