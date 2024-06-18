import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SignupComponent } from './view/artista/signup/signup.component';
import { SigninComponent } from './view/artista/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './view/artista/profile/profile.component';
import { EditProfileComponent } from './view/artista/edit-profile/edit-profile.component';
import { HeaderComponent } from './view/components/header/header.component';
import { FooterComponent } from './view/components/footer/footer.component';
import { ManageArtComponent } from './view/arte/manage-art/manage-art.component';
import { PublishArtComponent } from './view/arte/publish-art/publish-art.component';
import { EditArtComponent } from './view/arte/edit-art/edit-art.component';
import { ArtDetailComponent } from './view/arte/art-detail/art-detail.component';
import { CatalogComponent } from './view/components/catalog/catalog.component';
import { NotfoundComponent } from './view/components/notfound/notfound.component';

console.log(environment)

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    EditProfileComponent,
    HeaderComponent,
    FooterComponent,
    ManageArtComponent,
    PublishArtComponent,
    EditArtComponent,
    ArtDetailComponent,
    CatalogComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
