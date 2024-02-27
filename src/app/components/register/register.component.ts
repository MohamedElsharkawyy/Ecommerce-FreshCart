import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading:boolean = false;
  errorMessage:string = '';
  constructor(private _AuthService:AuthService , private _Router:Router){}
  registerForm:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword:new FormControl(''),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  }, {validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(group:FormGroup){
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if(rePassword?.value == ''){
      rePassword.setErrors({required:true});
    }else if(password?.value != rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }

  handleForm(){
    this.loading = true;
    const userData = this.registerForm.value;

    if(this.registerForm.valid === true){
      this._AuthService.register(userData).subscribe({
        next:(response)=>{
          if(response.message == 'success'){
            this._Router.navigate(['/login']);
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
