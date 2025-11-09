export class FormValidationErrors {
  [key: string]: string; 
  passwordMismatch: string = 'As senhas não coincidem.';
  required: string = 'Este campo é obrigatório.';
  passwordStrength: string = 'A senha não atende aos requisitos de segurança.';
  minlength: string = 'O campo deve ter no mínimo 8 caracteres.';
  email: string = 'Por favor, insira um endereço de e-mail válido.';
}

export class PasswordValidationErros  {
  [key: string]: string; 
  upperCaseRequired: string = 'É necessário pelo menos uma letra maiúscula.';
  lowerCaseRequired: string = 'É necessário pelo menos uma letra minúscula.';
  numberRequired: string = 'É necessário pelo menos um número.';
  specialCharacterRequired: string = 'É necessário pelo menos um caractere especial.';
  maxlength: string = 'O campo deve ter no máximo 8 caracteres.';
}