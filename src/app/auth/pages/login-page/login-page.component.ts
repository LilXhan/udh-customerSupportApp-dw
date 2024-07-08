import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder)
  private authService = inject( AuthService )
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.minLength(0)]]
  })

  login() {

    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/tickets/list'),
        error: (err) => {
          Swal.fire('Error', err, 'error')
        }
      })
  }

}
