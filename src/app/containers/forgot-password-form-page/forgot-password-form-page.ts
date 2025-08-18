import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password-form-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password-form-page.html',
  styleUrl: './forgot-password-form-page.scss'
})
export class ForgotPasswordFormPage {
    form:FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  sendCode(){
    console.log("code");
  }

  resetForm(){
    this.form.reset();
  }
}
