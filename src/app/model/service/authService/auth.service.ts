// src/app/model/service/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'firebase/auth'; // Importe o tipo User correto para a sua versão do Firebase


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
      return this.firestore.collection('artistas').doc(userId).delete();
    }

    // Atualizar perfil do artista
    updateArtistProfile(userId: string, userProfile: any){
      return this.firestore.collection('artistas').doc(userId).update(userProfile);
    }

    async getCurrentUserId(): Promise<string | null> {
      const user = await this.fireAuth.currentUser;
      return user ? user.uid : null;
    }
  
}
