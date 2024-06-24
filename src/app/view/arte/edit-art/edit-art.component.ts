import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ArtService } from 'src/app/model/service/artService/art.service';

@Component({
  selector: 'app-edit-art',
  templateUrl: './edit-art.component.html',
  styleUrls: ['./edit-art.component.css']
})
export class EditArtComponent implements OnInit {
  artistId: string;
  artId: string;
  art: any = {
    title: '',
    description: '',
    technique: '',
    imageUrl: ''
  };
  selectedFile: File | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artService: ArtService,
    private storage: AngularFireStorage
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
    this.artId = this.route.snapshot.paramMap.get('artId')!;
  }

  ngOnInit() {
    this.artService.getArt(this.artistId, this.artId).subscribe(art => {
      this.art = art;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.art.title || !this.art.description || !this.art.technique) {
      this.errorMessage = 'Preencha todos os campos!';
      return;
    }

    if (this.selectedFile) {
      const filePath = `art_images/${this.artistId}/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFile);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.art.imageUrl = url;
            this.saveArt();
          });
        })
      ).subscribe();
    } else {
      this.saveArt();
    }
  }

  saveArt() {
    this.artService.updateArt(this.artistId, this.artId, this.art).then(() => {
      this.router.navigate([`/profile/${this.artistId}/manage-art`]);
    });
  }
}
