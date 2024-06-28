import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.css']
})
export class AjudaComponent {

  constructor(
    private router: Router,
  ){}

  navigateToSignin(){
    this.router.navigate([`/signin`])
  }
}
