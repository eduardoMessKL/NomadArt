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
    
      this.spinner.show();
      setTimeout(()=>{  
        this.spinner.hide()  
      }, 3000)
  }

  navigateToAjuda(){
    this.router.navigate([`/help`])
  }
  navigateToCatalog(){
    this.router.navigate(['/catalog'])
  }
}
