import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';

@Component({
  selector: 'app-manage-art',
  templateUrl: './manage-art.component.html',
  styleUrls: ['./manage-art.component.css']
})
export class ManageArtComponent implements OnInit {
  artistId: string;
  artworks: any[] = [];
  currentUserId: string | null = null;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artService: ArtService,
    private authService: AuthService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
  }

  async ngOnInit() {
    console.log('Usuário logado: ', this.authService.getCurrentUserId())
    this.loadArtworks();
  }

  loadArtworks() {
    this.artService.getArtworksByArtist(this.artistId).subscribe(artworks => {
      this.artworks = artworks;
    });
  }

  publishArt() {
    this.router.navigate([`/profile/${this.artistId}/publish-art`]);
  }

  editArtwork(artworkId: string) {
    this.router.navigate([`/profile/${this.artistId}/edit-art/${artworkId}`]);
  }

  backToProfile(){
    this.router.navigate([`/profile/${this.artistId}`])
  }
}
