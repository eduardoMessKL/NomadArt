import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../model/service/authService/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  artist: any = null;
  userId: string | null = null;
  currentUserId: string | null = null; // Adicione uma variável para armazenar o ID do usuário logado

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    
  ) { }

 async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.currentUserId = await this.authService.getCurrentUserId();

    if (this.userId) {
      this.authService.getArtistProfile(this.userId).subscribe(artist => {
        this.artist = artist;
      });
    }
    console.log('Id cadastrado:', this.currentUserId)
  }

  logout(): void {
    if (confirm('Você tem certeza que quer sair?')) {
      this.authService.logout().then(() => {
        this.router.navigate(['/signin']);
      });
    }
  }

  deleteProfile(): void {
    if (confirm('Você tem certeza que quer deletar o perfil?')) {
      if (this.userId) {
        this.authService.deleteArtistProfile(this.userId).then(() => {
          this.router.navigate(['/signin']);
        });
      }
    }
  }

  updateProfile(): void {
    if (this.userId) {
      this.router.navigate([`/profile/${this.userId}/edit`]);
    }
  }

}
