// src/app/model/service/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, from, map, switchMap } from 'rxjs';
import { ArtService } from '../artService/art.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private artService: ArtService
  ) { }

  //registro de um artista
  register(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  //login 
  login(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  //logout
  logout(){
    return this.fireAuth.signOut();
  }

  //salva as informações adicionais do artista criando uma coleção chamada artistas
  saveArtistProfile(userId: string, userProfile: any){
    return this.firestore.collection('artistas').doc(userId).set(userProfile);
  }

  //obter o perfil do artista
  getArtistProfile(userId: string){
    return this.firestore.collection('artistas').doc(userId).valueChanges();
  }

  // apagar o perfil e tambem a auth no firebase
  deleteArtistProfile(userId: string) {
    return this.artService.deleteAllArtsOfArtist(userId).pipe(
      switchMap(() => from(this.firestore.collection('artistas').doc(userId).delete())),
      switchMap(() => from(this.deleteUser())),
      switchMap(() => this.deleteUserImages(userId))
    ).toPromise();
  }

  private deleteUser() {
    return this.fireAuth.currentUser.then(user => {
      if (user) {
        return user.delete();
      }
      throw new Error('No user currently authenticated');
    });
  }

  private deleteUserImages(userId: string) {
    const profileImageRef = this.storage.ref(`profile_images/${userId}`);
    const artImagesRef = this.storage.ref(`art_images/${userId}`);

    return from(profileImageRef.delete()).pipe(
      switchMap(() => artImagesRef.listAll()),
      switchMap((listResult) => {
        const deletePromises = listResult.items.map(itemRef => itemRef.delete());
        return Promise.all(deletePromises);
      })
    );
  }
  // Atualizar perfil do artista
  updateArtistProfile(userId: string, userProfile: any){
    return this.firestore.collection('artistas').doc(userId).update(userProfile);
  }

  async getCurrentUserId(){
    const user = await this.fireAuth.currentUser;
    return user ? user.uid : null;
  }  

  isLoggedIn(): Observable<boolean>{
    return this.fireAuth.authState.pipe(
      map(user => !!user)
    )
  }
}
