import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinner, MatCardModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, NgIf],

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isLoading = signal(false);

  constructor(private authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) return

    this.authService.createUser(form.value)
  }

}
