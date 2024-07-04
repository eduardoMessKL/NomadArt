import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../model/service/authService/auth.service';
import { AlertService } from 'src/app/common/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Preencha todos os campos para realizar Login!';
      return;
    }

    this.authService.login(this.email, this.password)
    .then(res => {
      if (res.user) {
        this.router.navigate([`/profile/${res.user.uid}`]);
      }
    })      
    .catch(error => {
      console.error('Login failed', error);
      this.errorMessage = 'Falha no login. Verifique suas credenciais e tente novamente.';
    });
    
      this.spinner.show();
      setTimeout(()=>{  
        this.spinner.hide()  
      }, 5000)
  }

  navigateToAjuda(){
    this.router.navigate([`/help`])
  }
  navigateToCatalog(){
    this.router.navigate(['/catalog'])
  }
}
