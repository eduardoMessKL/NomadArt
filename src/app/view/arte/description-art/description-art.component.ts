import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';

@Component({
  selector: 'app-description-art',
  templateUrl: './description-art.component.html',
  styleUrls: ['./description-art.component.css']
})
export class DescriptionArtComponent implements OnInit {
  artistId: string;
  artId: string;
  art: any = {};
  otherArts: any[] = [] ;
  artistProfile: any = {};

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
    this.authService.getArtistProfile(this.artistId).subscribe(profile => {
      this.artistProfile = profile
    })

    this.artService.getArt(this.artistId, this.artId).subscribe(art => {
      this.art = art;
    });

    this.artService.getArts(this.artistId).subscribe(otherArts =>{
      this.otherArts = otherArts;
    })
  }

  viewArtistProfile() {
    this.router.navigate([`/profile/${this.artistId}`]);
  }
}
