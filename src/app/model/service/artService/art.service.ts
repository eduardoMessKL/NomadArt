import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, forkJoin } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtService {

  constructor(private firestore: AngularFirestore) { }

  //pega todas as artes de todos os artistas (passando o id do "pai"(artistId))
  getAllArts(){
    return this.firestore.collectionGroup('artes').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        const artistId = a.payload.doc.ref.parent.parent?.id;
        return { id, ...data, artistId };
      }))
    );
  }

  //retorna unicamente uma arte de um artista
  getArt(artistId: string, artId: string){
    return this.firestore.collection('artistas').doc(artistId).collection('artes').doc(artId).valueChanges();
  }

  //retorna todas as artes de um artista
  getArts(artistId: string){
    return this.firestore.collection(`artistas/${artistId}/artes`).valueChanges({ idField: 'id' });
  }

  //adiciona arte
  addArt(artistId: string, art: any){
    const id = this.firestore.createId();
    return this.firestore.collection('artistas').doc(artistId).collection('artes').doc(id).set(art);
  }

  //atualiza arte
  updateArt(artistId: string, artId: string, art: any){
    return this.firestore.collection('artistas').doc(artistId).collection('artes').doc(artId).update(art);
  }

  //apaga arte
  deleteArt(artistId: string, artId: string){
    return this.firestore.collection('artistas').doc(artistId).collection('artes').doc(artId).delete();
  }  

  deleteAllArtsOfArtist(artistId: string) {
    return this.firestore.collection('artistas').doc(artistId).collection('artes').snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.id)),
      map(ids => ids.map(id => this.firestore.collection('artistas').doc(artistId).collection('artes').doc(id).delete())),
      map(deletions => forkJoin(deletions)),
      map(() => void 0)
    );
  }

}
