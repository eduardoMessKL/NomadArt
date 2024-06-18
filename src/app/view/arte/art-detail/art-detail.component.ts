import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';

@Component({
  selector: 'app-art-detail',
  templateUrl: './art-detail.component.html',
  styleUrls: ['./art-detail.component.css']
})
export class ArtDetailComponent implements OnInit {
  artistId: string;
  artId: string;
  art: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artService: ArtService,
    private authService: AuthService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('artistId')!;
    this.artId = this.route.snapshot.paramMap.get('artId')!;
  }

  ngOnInit() {
    this.artService.getArtById(this.artistId, this.artId).subscribe(art => {
      this.art = art;
    });
    return this.authService.getCurrentUserId()
  }

  viewArtistProfile() {
    this.router.navigate([`/profile/${this.artistId}`]);
  }
}
