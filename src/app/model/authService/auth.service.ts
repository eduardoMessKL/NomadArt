import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth : AngularFireAuth, 
    private firestore : AngularFirestore
  ) { }

  //Cadastro de usuário
  register(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }

  //Login de usuário
  login(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  //Logout
  logout(){
    return this.fireAuth.signOut()
  }

  //Salvar informações adicionais do usuário
  saveArtistProfile(userId: string, userProfile: any){
    return this.firestore.collection('artistas').doc(userId).set(userProfile)
  }
}
