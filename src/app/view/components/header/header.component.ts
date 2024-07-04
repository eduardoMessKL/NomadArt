import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
  ) {}

  async ngOnInit(){
    this.authService.isLoggedIn().subscribe(loggedIn =>{
      this.isLoggedIn = loggedIn;
    })
  }

  async navigateToSignup(): Promise<void> {
    const userId = await this.authService.getCurrentUserId()
    if(userId){
      console.error('User already looged in')
    } else {
      this.router.navigate(['/signup']);
    }
  }

  async navigateToSignin(): Promise<void> {
    const userId = await this.authService.getCurrentUserId()
    if (userId){
      console.error('User already logged in')
    } else{
      this.router.navigate(['/signin']);
    }
  }

  async navigateToPublish(): Promise<void> {
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      this.router.navigate([`profile/${userId}/publish-art`]);
    } else {
      console.error('User not logged in');
    }
  }

  async navigateToProfile(): Promise<void> {
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      this.router.navigate([`profile/${userId}`]);
    } else {
      console.error('User not logged in');
    }
  }

  navigateToHome(){
    this.router.navigate(['/'])
  }
}
