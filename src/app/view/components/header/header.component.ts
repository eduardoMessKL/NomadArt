import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  alertMessage: string = '';
  userId: string | null = null;
  currentUserId: string | null = null; 

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private alertService: AlertService, 
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.currentUserId = await this.authService.getCurrentUserId();
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
    this.router.navigate(['/art-catalog'])
  }
}
