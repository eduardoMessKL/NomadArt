import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';

@Component({
  selector: 'app-publish-art',
  templateUrl: './publish-art.component.html',
  styleUrls: ['./publish-art.component.css']
})
export class PublishArtComponent implements OnInit {
  artistId: string;
  art: any = {
    title: '',
    description: '',
    technique: {
      oil: false,
      acrylic: false,
      watercolor: false,
      digital: false,
      other: false
    }
  };
  selectedFile: File | null = null;
  errorMessage: string = '';
  userId: any;
  currentUserId: any;

  constructor(
    private artService: ArtService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id');
    this.currentUserId = await this.authService.getCurrentUserId();  
    console.log('Id logado: ', this.artistId)
  }

  onSubmit() {
    if (!this.art.title || !this.art.description || !this.selectedFile || !this.art.technique) {
      this.errorMessage = 'Preencha todos os campos!';
      return;
    }

    const filePath = `art_images/${this.artistId}/${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.art.imageUrl = url;
          this.artService.addArt(this.artistId, this.art).then(() => {
            this.router.navigate([`/profile/${this.artistId}/manage-art`]);
          });
        });
      })
    ).subscribe();
  }
}
