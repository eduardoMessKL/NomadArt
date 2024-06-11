import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../model/service/authService/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/common/alert.service';

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
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private alertService: AlertService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.authService.getArtistProfile(this.artistId).subscribe(artist => {
      this.artist = artist;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.artist.name || !this.artist.profileDescription || !this.artist.country || !this.artist.techniques) {
      this.errorMessage = 'Preencha todos os campos!';
      return;
    }

    if (this.artist.profileDescription.length > 200) {
      this.errorMessage = 'Máximo de caracteres para a descrição é de 200 elementos!';
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
  }

  saveArtistProfile(profileImageUrl: string | null) {
    const artistProfile = {
      name: this.artist.name,
      profileDescription: this.artist.profileDescription,
      country: this.artist.country,
      techniques: this.artist.techniques,
      profileImageUrl: profileImageUrl
    };
    this.authService.updateArtistProfile(this.artistId, artistProfile)
      .then(() => {
        this.alertService.showAlert('Perfil atualizado com sucesso!');
        this.router.navigate([`/profile/${this.artistId}`]);
      })
      .catch(error => {
        console.error('Error updating artist profile', error);
      });
  }

  cancelar(){
    this.router.navigate([`/profile/${this.artistId}`]);
  }
}
