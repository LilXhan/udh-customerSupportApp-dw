import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(255)]],
    first_name: ['', [Validators.required, Validators.maxLength(255)]],
    last_name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  register() {

    const { username, first_name, last_name, email, password  } = this.myForm.value;
    
    const newUser = {
      username,
      first_name,
      last_name,
      email,
      password
    }

    this.authService.register(newUser)
      .subscribe({
        next: () => this.router.navigateByUrl('/auth/login'),
        error: (err) => {
          Swal.fire('Error', err, 'error')
        }
      })
  }
}
