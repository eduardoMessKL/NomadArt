import { Component } from '@angular/core';
import { AuthService } from '../../../model/service/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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

  constructor(private authService: AuthService, private storage: AngularFireStorage) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.artist.password !== this.artist.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    this.authService.register(this.artist.email, this.artist.password)
      .then(res => {
        const userId = res.user?.uid; // Pega o UID do usuário
        if (this.selectedFile && userId) {
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
        } else if (userId) {
          this.saveArtistProfile(userId, null);
        }
      })
      .catch(error => {
        console.error('Error registering artist', error);
      });
  }

  saveArtistProfile(artistId: string, profileImageUrl: string | null) {
    const artistProfile = {
      name: this.artist.name,
      email: this.artist.email,
      profileDescription: this.artist.profileDescription,
      country: this.artist.country,
      techniques: this.artist.techniques,
      profileImageUrl: profileImageUrl
    };
    this.authService.saveArtistProfile(artistId, artistProfile)
      .then(() => {
        console.log('Artist profile saved successfully');
      })
      .catch(error => {
        console.error('Error saving artist profile', error);
      });
  }
}
