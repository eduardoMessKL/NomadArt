import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtService } from 'src/app/model/service/artService/art.service';

@Component({
  selector: 'app-manage-art',
  templateUrl: './manage-art.component.html',
  styleUrls: ['./manage-art.component.css']
})
export class ManageArtComponent implements OnInit {
  artistId: string;
  arts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artService: ArtService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.artService.getArts(this.artistId).subscribe(arts => {
      this.arts = arts;
    });
  }

  publishArt() {
    this.router.navigate([`/profile/${this.artistId}/publish-art`]);
  }

  editArt(artId: string) {
    this.router.navigate([`/profile/${this.artistId}/edit-art/${artId}`]);
  }

  deleteArt(artId: string) {
    if (confirm('Tem certeza que deseja deletar esta arte?')) {
      this.artService.deleteArt(this.artistId, artId).then(() => {
        this.arts = this.arts.filter(art => art.id !== artId);
      });
    }
  }
}
