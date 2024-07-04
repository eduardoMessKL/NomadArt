import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../model/service/authService/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/common/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArtService } from 'src/app/model/service/artService/art.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  artist: any = {
    name: '',
    profileDescription: '',
    country: '',
    instagram: '',
    techniques: {
      oil: false,
      acrylic: false,
      watercolor: false,
      digital: false,
      other: false
    }
  };
  artistId: string;
  selectedFile: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null =  null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private artService: ArtService,
    private storage: AngularFireStorage,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
  }

  async ngOnInit() {
    this.authService.getArtistProfile(this.artistId).subscribe(artist => {
      this.artist = artist;
    });
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
    this.spinner.show();
    setTimeout(()=>{
      if (!this.artist.name || !this.artist.profileDescription || !this.artist.country || !this.artist.techniques) {
        this.errorMessage = 'Preencha todos os campos!';
        return;
      }
  
      if (this.artist.name.length > 50){
        this.errorMessage = 'Mínimo de caracteres para o nome é de 50 elementos!'; 
      }

      if (this.artist.profileDescription.length > 500) {
        this.errorMessage = 'Máximo de caracteres para a descrição é de 500 elementos!';
        return;
      }
  
      if (this.selectedFile) {
        const filePath = `profile_images/${this.artistId}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);
  
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.saveArtistProfile(url);
            });
          })
        ).subscribe();
      } else {
        this.saveArtistProfile(this.artist.profileImageUrl);
      }
      this.spinner.hide()
    }, 2000)
  }

  saveArtistProfile(profileImageUrl: string | null) {
    const artistProfile = {
      name: this.artist.name,
      profileDescription: this.artist.profileDescription,
      country: this.artist.country,
      instagram: this.artist.instagram,
      techniques: this.artist.techniques,
      profileImageUrl: profileImageUrl
    };
    this.authService.updateArtistProfile(this.artistId, artistProfile)
      .then(() => {
        this.alertService.showAlert('Perfil ATUALIZADO com sucesso');
        this.router.navigate([`/profile/${this.artistId}`]);
      })
  }

  cancelar(){
    this.router.navigate([`/profile/${this.artistId}`]);
    console.log('Edição de perfil CANCELADA')
  }

  deleteProfile(): void {
    if (confirm('Você tem certeza que quer apagar seu perfil?')) {
        this.router.navigate(['/signin']);
      
        if (this.artistId) {
          this.authService.deleteArtistProfile(this.artistId)
            .then(() => {
              console.log("Perfil e artes deletados com sucesso");
            })
            .catch(error => {
              console.error("Erro ao deletar o perfil: ", error);
            });
        } else {
          alert('ID do artista não encontrado.');
        }
    }
  } 
}
