import { Component } from '@angular/core';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/authService/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = ''
  password: string = ''
  errorMessage: string = ''

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService){}

  onSubmit(){
    if (!this.email || !this.password){
      this.errorMessage =  "Preencha todos os campos para realizar Login!"
      return
    }

    this.authService.login(this.email, this.password)
    .then(res =>{
      console.log('Login successful', res);
      this.alertService.showAlert('Login realizado com sucesso!')
    })
    this.navigateToProfile()
  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }
}
