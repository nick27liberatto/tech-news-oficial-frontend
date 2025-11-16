import { Component, inject, Inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService as SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-register-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-form-page.html',
  styleUrl: './register-form-page.scss'
})
export class RegisterFormPage {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  form:FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit(){
    if (this.form.valid) {
      this.supabaseService.signUp(this.form.value.fullName, this.form.value.email, this.form.value.password)
      .then((response) => {
        if(response.error) {
          console.log('Erro ao realizar cadastro.', response.error)
        } else {
          console.log('Sucesso ao realizar cadastro!', response.data)
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
    } else {
      this.form.markAllAsTouched();
    }
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
