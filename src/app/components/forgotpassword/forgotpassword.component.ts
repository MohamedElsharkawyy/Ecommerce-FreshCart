import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotpasswordService } from 'src/app/core/services/forgotpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
constructor(private _ForgotpasswordService:ForgotpasswordService , private _Router:Router){}
step1:boolean = true;
step2:boolean = false;
step3:boolean = false;
userEmail:string = '';
successMsg : string = '';
errorMsg : string = '';
forgotForm:FormGroup = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
})
resetCodeForm:FormGroup = new FormGroup({
  resetCode:new FormControl('',[Validators.required]),
})
resetPasswordForm:FormGroup = new FormGroup({
  newPassword:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
});

forgotPassword():void{
  let email = this.forgotForm.value;
  this.userEmail = email.email;
  this._ForgotpasswordService.forgotPassword(email).subscribe({
    next:(response)=>{
      this.errorMsg = '';
      this.successMsg = response.message;
      this.step1 = false;
      this.step2 = true;
    },
    error:(error)=>{
      this.errorMsg = error.error.message;
    }
  })
}
resetCode():void{
  let code = this.resetCodeForm.value;
  this._ForgotpasswordService.resetCode(code).subscribe({
    next:(response)=>{
      this.errorMsg = '';
      this.successMsg = "Your code is correct";
      this.step2 = false;
      this.step3 = true;
    },error:(error)=>{
      this.successMsg = '';
      this.errorMsg = error.error.message;
    }
  })
}
newPassword():void{
  let password = this.resetPasswordForm.value;
  console.log('password object from the first : ',password);
  password.email = this.userEmail;
  this._ForgotpasswordService.resetPassword(password).subscribe({
    next:(response)=>{
      if(response.token){
        localStorage.setItem('userToken',response.token);
        this._Router.navigate(['/home']);
      }
    },error:(error)=>{
      this.successMsg = '';
      this.errorMsg = error.error.message;
    }
  })
}
}
