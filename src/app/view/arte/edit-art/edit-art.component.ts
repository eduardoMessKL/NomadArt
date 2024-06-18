import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';

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
    technique: {
      oil: false,
      acrylic: false,
      watercolor: false,
      digital: false,
      other: false
    }
  };
  selectedFile: File | null = null;
  userId: any;
  currentUserId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artService: ArtService,
    private authService: AuthService,
    private storage: AngularFireStorage,
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
    this.artId = this.route.snapshot.paramMap.get('artId')!;
  }

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.currentUserId = await this.authService.getCurrentUserId();  

    this.artService.getArtById(this.artistId, this.artId).subscribe(art => {
      this.art = art;
    });
    console.log('Usuáio Logado: ', this.authService.getCurrentUserId())
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.art.title || !this.art.description) {
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
            this.updateArt();
          });
        })
      ).subscribe();
    } else {
      this.updateArt();
    }
  }

  updateArt() {
    this.artService.updateArt(this.artistId, this.artId, this.art).then(() => {
      this.router.navigate([`/profile/${this.artistId}/manage-art`]);
      console.log('Arte editada com sucesso!')
    });
  }

  deleteArt(){
    if(confirm('Você tem certexa que quer deletar a arte selecionada?'))
        this.artService.deleteArt(this.artistId, this.artId).then(()=>{
          this.router.navigate([`/profile/${this.artistId}/manage-art`]);
          console.log('Arte excluída com sucesso!')
        })
    }

    backToManage(){
      this.router.navigate([`/profile/${this.artistId}/manage-art`])
    }
}
