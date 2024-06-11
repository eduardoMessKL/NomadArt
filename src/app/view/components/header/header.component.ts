import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  alertMessage: string = '';

  constructor(private router: Router, private alertService: AlertService, private authService: AuthService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe(message => {
      this.alertMessage = message;
      if (message) {
        setTimeout(() => this.alertService.clearAlert(), 500);
      }
    });
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }

  navigateToSignin(): void {
    this.router.navigate(['/signin']);
  }

  async navigateToProfile(): Promise<void> {
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      this.router.navigate([`profile/${userId}`]);
    } else {
      // Handle case when user is not logged in
      console.error('User not logged in');
    }
  }
}
