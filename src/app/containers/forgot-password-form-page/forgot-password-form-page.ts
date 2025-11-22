import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-forgot-password-form-page',
  imports: [RouterLink, ReactiveFormsModule, ValidationErrorMessageComponent],
  templateUrl: './forgot-password-form-page.html',
  styleUrl: './forgot-password-form-page.scss'
})
export class ForgotPasswordFormPage {
    private supabaseService = inject(SupabaseService);
    emailSent: boolean = false;
    form:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  async onSubmit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const response = await this.supabaseService.client.auth.resetPasswordForEmail(this.email.value, {
      redirectTo: 'reset-password'
    });

    if (response.error) {
      console.error('Error sending password reset email:', response.error.message);
      return;
    }

    this.emailSent = true;
  }

  resetForm(){
    this.form.reset();
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
}
