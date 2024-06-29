// src/app/model/service/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject(null);

  constructor(
    private fireAuth: AngularFireAuth, 
    private firestore: AngularFirestore
  ) { }

  // Cadastro de usuário
  register(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Login de usuário
  login(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  // Logout
  logout(){
    return this.fireAuth.signOut();
  }

  // Salvar informações adicionais do usuário
  saveArtistProfile(userId: string, userProfile: any){
    return this.firestore.collection('artistas').doc(userId).set(userProfile);
  }

  // Obter perfil do artista
  getArtistProfile(userId: string): Observable<any> {
    return this.firestore.collection('artistas').doc(userId).valueChanges();
  }
  
  // Deletar perfil do artista
  deleteArtistProfile(userId: string): Promise<void> {
    return this.firestore.collection('artistas').doc(userId).delete().then(()=>{
      return this.deleteUser();
    });
  }

  async deleteUser(): Promise<void> {
    const user = await this.fireAuth.currentUser;

  if(user){
    return user.delete().then(()=>{

    })
  } else{
    return Promise.reject();
  } 
  }

  // Atualizar perfil do artista
  updateArtistProfile(userId: string, userProfile: any){
    return this.firestore.collection('artistas').doc(userId).update(userProfile);
  }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.fireAuth.currentUser;
    return user ? user.uid : null;
  }  

  isLoggedIn(): Observable<boolean>{
    return this.fireAuth.authState.pipe(
      map(user => !!user)
    )
  }
}
