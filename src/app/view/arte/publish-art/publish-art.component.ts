import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-publish-art',
  templateUrl: './publish-art.component.html',
  styleUrls: ['./publish-art.component.css']
})
export class PublishArtComponent {
  artistId: string;
  art: any = {
    title: '',
    description: '',
    technique: '',
    year: '',
    imageUrl: '',
  };
  selectedFile: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artService: ArtService,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private spinner: NgxSpinnerService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    if(file){
      const reader = new FileReader();
      reader.onload = (e) =>{
        const result = e.target?.result;
        if(result !== undefined){
          this.selectedImageUrl = result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.art.title || !this.art.description || !this.art.technique || !this.selectedFile) {
      this.errorMessage = 'Preencha todos os campos!';
      return;
    }
    if(this.art.title.length > 50){
      this.errorMessage = 'Título não pode ter mais de 50 caracteres!';
      return;
    }
    if(this.art.description.length > 500){
      this.errorMessage = 'Descrição não pode ter mais de 500 caracteres!';
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

    this.spinner.show();
    setTimeout(()=>{  
      this.spinner.hide()  
    }, 5000)
  }

  async navigateToProfile(): Promise<void> {
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      this.router.navigate([`profile/${userId}`]);
    } else {
      console.error('User not logged in');
    }
  }
}
