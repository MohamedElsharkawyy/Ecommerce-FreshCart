import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading:boolean = false;
  errorMessage:string = '';
  constructor(private _AuthService:AuthService , private _Router:Router){}
  loginForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  })

  handleForm(){
    this.loading = true;
    const userData = this.loginForm.value;

    if(this.loginForm.valid === true){
      this._AuthService.signIn(userData).subscribe({
        next:(response)=>{
          if(response.message == 'success'){
            localStorage.setItem('userToken',response.token)
            this._Router.navigate(['/home']);
            this.loading = false;
          }
        },
        error:(error)=>{
          this.errorMessage = error.error.message;
          this.loading = false;
        }
      })
    }
  }
}
