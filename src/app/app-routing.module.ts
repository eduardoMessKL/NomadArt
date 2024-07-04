import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './view/artista/signup/signup.component';
import { SigninComponent } from './view/artista/signin/signin.component';
import { ProfileComponent } from './view/artista/profile/profile.component';
import { EditProfileComponent } from './view/artista/edit-profile/edit-profile.component';
import { ManageArtComponent } from './view/arte/manage-art/manage-art.component';
import { PublishArtComponent } from './view/arte/publish-art/publish-art.component';
import { EditArtComponent } from './view/arte/edit-art/edit-art.component';
import { CatalogComponent } from './view/components/catalog/catalog.component';
import { NotfoundComponent } from './view/components/notfound/notfound.component';
import { DescriptionArtComponent } from './view/arte/description-art/description-art.component';
import { AuthGuard } from './common/guard/auth.guard';
import { AjudaComponent } from './view/components/ajuda/ajuda.component';
import { GalleryComponent } from './view/components/gallery/gallery.component';
import { CopyrightComponent } from './view/components/copyright/copyright.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'notfound', component: NotfoundComponent},
  { path: 'copyright', component: CopyrightComponent},
  { path: 'help', component: AjudaComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile/:id/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/manage-art', component: ManageArtComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/publish-art', component: PublishArtComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/edit-art/:artId', component: EditArtComponent, canActivate: [AuthGuard] },
  { path: '', component: CatalogComponent},
  { path: 'gallery', component: GalleryComponent},
  { path: 'description-art/:artistId/:artId', component: DescriptionArtComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
