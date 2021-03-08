import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class FirebasedbService {

  constructor(private firestore: AngularFirestore) {}

  //* Retorna documents de la DB 'projects'
  getProjects(): Observable<Project[]> {
    return this.firestore.collection<Project>('projects').valueChanges();
  }
}
