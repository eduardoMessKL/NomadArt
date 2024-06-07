import { Component } from '@angular/core';
import { AuthService } from 'src/app/model/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = ''
  password: string = ''

  constructor(private authService: AuthService){}

  onSubmit(){
    this.authService.login(this.email, this.password)
      .then(res => {
        console.log('Login successful', res);
      })
      .catch(err =>{
        console.log('Error during login', err);
        alert('Login falhou. Verifique suas credenciais e tente novamente.')
      })
  }

}
