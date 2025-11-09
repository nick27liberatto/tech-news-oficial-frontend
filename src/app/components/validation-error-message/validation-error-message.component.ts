import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormValidationErrors } from "../../models/form-validation-errors.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './validation-error-message.component.html',
  styleUrl: './validation-error-message.component.scss'
})
export class ValidationErrorMessageComponent {
  @Input() control: FormControl = new FormControl();
  formValidationErrors: FormValidationErrors = new FormValidationErrors();
  get controlErrors() { return this.control?.errors; }
}
