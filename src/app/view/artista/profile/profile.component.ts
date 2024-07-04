import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../model/service/authService/auth.service';
import { ArtService } from 'src/app/model/service/artService/art.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  artist: any = null;
  artistId: string;
  arts: any [] = [];
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private artService: ArtService,
    private router: Router,
  ) { 
    this.artistId = this.route.snapshot.paramMap.get('id')!;
  }

 async ngOnInit(): Promise<void> {
    this.currentUserId = await this.authService.getCurrentUserId();

    if (this.artistId) {
      this.authService.getArtistProfile(this.artistId).subscribe(artist => {
        this.artist = artist;
      });
    }
    this.artService.getArts(this.artistId).subscribe(arts =>{
      this.arts =  arts;
    })
  }

  logout(): void {
    if (confirm('Você tem certeza que quer sair?')) {
      this.authService.logout().then(() => {
        this.router.navigate(['/signin']);
      });
    }
  }

  updateProfile(): void {
    if (this.artistId) {
      this.router.navigate([`/profile/${this.artistId}/edit`]);
    }
  }

  manageArt() {
    this.router.navigate([`/profile/${this.artistId}/manage-art`]);
  }

  publishArt() {
    this.router.navigate([`/profile/${this.artistId}/publish-art`]);
  }

  viewArt(art:any){
    this.router.navigate([`/description-art/${this.artistId}/${art.id}`])
  }

  navigateToCatalog(){
    this.router.navigate([`/`])
  }
}
