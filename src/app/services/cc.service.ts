import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { CC } from '../models/CC';

@Injectable({
  providedIn: 'root'
})
export class CcService {

  private card$ = new Subject<any>();

  constructor(
    private firestore: AngularFirestore
  ) { }

  saveCC(card: CC): Promise<any> {
    return this.firestore.collection('cards').add(card);
  }

  listCC(): Observable<any> {
    return this.firestore.collection('cards', ref => ref.orderBy('created', 'asc')).snapshotChanges();
  }

  deleteCC(id: string): Promise<any> {
    return this.firestore.collection('cards').doc(id).delete();
  }

  editCard(id: string, card: any): Promise<any> {
    return this.firestore.collection('cards').doc(id).update(card);
  }

  editCC(card: CC) {
    this.card$.next(card);
  }

  getEdit(): Observable<CC> {
    return this.card$.asObservable();
  }
}
