import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/authService/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  artist: any = null;
  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadArtistProfile(this.userId);
      } else {
        this.router.navigate(['/signin']);
      }
    });
  }

  loadArtistProfile(userId: string) {
    this.authService.getArtistProfile(userId).subscribe(artistProfile => {
      this.artist = artistProfile;
    }, error => {
      console.error('Error loading artist profile', error);
      this.alertService.showAlert('Erro ao carregar perfil!');
    });
  }

  logout() {
    const confirmed = window.confirm('Você tem certeza que deseja sair?')
    if (confirmed){
    this.authService.logout().then(() => {
      this.router.navigate(['/signin']);
    });
    console.log('Logout successful')
  }
  }

  deleteProfile() {
    const confirmed = window.confirm('Você tem certeza que deseja apagar seu perfil?')
    if (this.userId && confirmed) {
      this.authService.deleteArtistProfile(this.userId).then(() => {
        this.authService.logout().then(() => {
          this.router.navigate(['/signin']);
        });
        this.alertService.showAlert('Perfil deletado com sucesso!');
        console.log('Profile Delete successful')
      }).catch(error => {
        console.error('Error deleting profile', error);
        this.alertService.showAlert('Erro ao deletar o perfil.');
      });
    }
  }
}
