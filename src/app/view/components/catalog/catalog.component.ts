import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtService } from 'src/app/model/service/artService/art.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  artworks: any[] = [];
  artistId: string

  constructor(private artService: ArtService, private router: Router, private route: ActivatedRoute) {
    this.artistId = this.route.snapshot.paramMap.get('artistId')!;
  }

  ngOnInit() {
    this.artService.getAllArtworks().subscribe(artworks => {
      this.artworks = artworks;
    });
  }

  viewArtwork(artistId: string, artId: string) {
    this.router.navigate([`/art/${this.artistId}/${artId}`]);
  }
}
