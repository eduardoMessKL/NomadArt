import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../model/service/authService/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/common/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  artist: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
  selectedFile: File | null = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private alertService: AlertService,
    private router: Router
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.artist.name || !this.artist.email || !this.artist.password || !this.artist.confirmPassword || !this.artist.profileDescription || !this.artist.country || !this.artist.techniques) {
      this.errorMessage = 'Preencha todos os campos!';
      return;
    }

    if (this.artist.password !== this.artist.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    if (this.artist.password.length < 6) {
      this.errorMessage = 'Mínimo de caracteres para a senha é de 6 elementos!';
      return;
    }

    if (this.artist.profileDescription.length > 200) {
      this.errorMessage = 'Máximo de caracteres para a descrição é de 200 elementos!';
      return;
    }

    this.authService.register(this.artist.email, this.artist.password)
      .then(res => {
        const userId = res.user?.uid; // Pega o UID do usuário
        if (userId) {
          if (this.selectedFile) {
            const filePath = `profile_images/${userId}`;
            const fileRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, this.selectedFile);

            uploadTask.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(url => {
                  this.saveArtistProfile(userId, url);
                });
              })
            ).subscribe();
          } else {
            this.saveArtistProfile(userId, null);
          }
        }
      })
      .catch(error => {
        console.error('Error registering artist', error);
        this.errorMessage = this.getErrorMessage(error);
      });
  }

  saveArtistProfile(artistId: string, profileImageUrl: string | null) {
    const artistProfile = {
      name: this.artist.name,
      profileDescription: this.artist.profileDescription,
      country: this.artist.country,
      techniques: this.artist.techniques,
      profileImageUrl: profileImageUrl
    };
    this.authService.saveArtistProfile(artistId, artistProfile)
      .then(() => {
        this.alertService.showAlert('Cadastro realizado com sucesso!');
        this.router.navigate([`/profile/${artistId}`]);
      })
      .catch(error => {
        console.error('Error saving artist profile', error);
      });
  }

  getErrorMessage(error: any): string {
    if (error.code === 'auth/email-already-in-use') {
      return 'E-mail já cadastrado';
    } else if (error.code === 'auth/invalid-email') {
      return 'Formato de email inválido';
    } else if (error.code === 'auth/weak-password') {
      return 'Mínimo de caracteres para a senha é de 6 elementos';
    } else {
      return 'Ocorreu um erro. Tente novamente.';
    }
  }
}
