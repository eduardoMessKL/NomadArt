import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtService {

  constructor(private firestore: AngularFirestore) { }

  // Adicionar arte
  addArt(artistId: string, art: any) {
    const artCollection = this.firestore.collection(`artistas/${artistId}/artes`);
    return artCollection.add(art);
  }

  // Obter todas as artes de um artista
  getArtworksByArtist(artistId: string): Observable<any[]> {
    const artCollection = this.firestore.collection(`artistas/${artistId}/artes`);
    return artCollection.valueChanges({ idField: 'id' });
  }

  // Obter uma arte específica
  getArtById(artistId: string, artId: string): Observable<any> {
    return this.firestore.doc(`artistas/${artistId}/artes/${artId}`).valueChanges();
  }

  // Atualizar arte
  updateArt(artistId: string, artId: string, art: any) {
    return this.firestore.doc(`artistas/${artistId}/artes/${artId}`).update(art);
  }

  // Deletar arte
  deleteArt(artistId: string, artId: string) {
    return this.firestore.doc(`artistas/${artistId}/artes/${artId}`).delete();
  }

  // Obter todas as artes publicadas por todos os artistas
  getAllArtworks(): Observable<any[]> {
    return this.firestore.collectionGroup('artes').valueChanges({ idField: 'id' });
  }
}
