import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './view/artista/signup/signup.component';
import { SigninComponent } from './view/artista/signin/signin.component';
import { ProfileComponent } from './view/artista/profile/profile.component';
import { EditProfileComponent } from './view/artista/edit-profile/edit-profile.component';
import { ManageArtComponent } from './view/arte/manage-art/manage-art.component';
import { PublishArtComponent } from './view/arte/publish-art/publish-art.component';
import { EditArtComponent } from './view/arte/edit-art/edit-art.component';
import { ArtDetailComponent } from './view/arte/art-detail/art-detail.component';
import { CatalogComponent } from './view/components/catalog/catalog.component';
import { NotfoundComponent } from './view/components/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/art-catalog', pathMatch: 'full'},
  { path: 'notfound', component: NotfoundComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'art-catalog', component: CatalogComponent},
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile/:id/edit', component: EditProfileComponent },
  { path: 'profile/:id/manage-art', component: ManageArtComponent },
  { path: 'profile/:id/publish-art', component: PublishArtComponent },
  { path: 'profile/:id/edit-art/:artId', component: EditArtComponent },
  { path: 'art/:artistId/:artId', component: ArtDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
