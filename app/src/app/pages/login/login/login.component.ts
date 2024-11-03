import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';

/**
 * The login component.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup<{
    name: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;
  errorMessage: string = '';

  /**
   * Constructor.
   * @param fb The form builder.
   * @param authService The authentication service.
   * @param router The router service.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Handles the login form submission.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { name, password } = this.loginForm.value;
      name && password && this.authService.login({ name, password })
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => this.errorMessage = 'Invalid username or password'
        });
    }
  }
}
