import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { NewsletterService } from "../../services/newsletter.service";
import { Newsletter, NewsletterWithFile } from "../../models/newsletter.model";
import { SupabaseService } from "../../services/supabase.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-form-page',
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './form-page.html',
  styleUrl: './form-page.scss'
})
export class FormPage {
  private newsletterService = inject(NewsletterService);
  private supabaseService = inject(SupabaseService);
  private snackBar = inject(MatSnackBar);
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    image: new FormControl(null)
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  private async newsletterDto(): Promise<NewsletterWithFile> {
    const newsletter = this.form.value;
    const { data: { user } } = await this.supabaseService.client.auth.getUser();

    return {
      title: newsletter.title,
      description: newsletter.body,
      file: this.selectedFile ?? undefined,
      user_id: user?.id || ''
    };
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    const newsletter = await this.newsletterDto();
    const response = await this.newsletterService.publish(newsletter);

    if (response.error) {
      console.log('Erro ao publicar newsletter.', response.error);
      this.snackBar.open(response.error.message, undefined, {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-error-snackbar'
      });
    } else {
      console.log('Newsletter publicada com sucesso!', response.data);
      this.snackBar.open('Newsletter publicada com sucesso!', undefined, {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-success-snackbar'
      });
      this.onReset();
    }
  }

  onReset() {
    this.form.reset();
    this.previewUrl = null;
  }
}