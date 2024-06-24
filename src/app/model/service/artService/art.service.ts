import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtService {

  constructor(private firestore: AngularFirestore) { }

  getAllArts(): Observable<any[]> {
    return this.firestore.collectionGroup('artes').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        const artistId = a.payload.doc.ref.parent.parent?.id;
        return { id, ...data, artistId };
      }))
    );
  }

  getArt(artistId: string, artId: string): Observable<any> {
    return this.firestore.collection('artistas').doc(artistId).collection('artes').doc(artId).valueChanges();
  }

  getArts(artistId: string): Observable<any[]> {
    return this.firestore.collection(`artistas/${artistId}/artes`).valueChanges({ idField: 'id' });
  }


  addArt(artistId: string, art: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('artistas').doc(artistId).collection('artes').doc(id).set(art);
  }

  updateArt(artistId: string, artId: string, art: any): Promise<void> {
    return this.firestore.collection('artistas').doc(artistId).collection('artes').doc(artId).update(art);
  }

  deleteArt(artistId: string, artId: string): Promise<void> {
    return this.firestore.collection('artistas').doc(artistId).collection('artes').doc(artId).delete();
  }

  searchArts(query: string): Observable<any[]> {
    return this.firestore.collection('arts', ref => 
      ref.where('title', '>=', query)
         .where('title', '<=', query + '\uf8ff'))
      .valueChanges();
  }
  
}
