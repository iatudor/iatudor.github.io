import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../models/project';

@Injectable({ providedIn: 'root' })
export class FirebaseDBService {

    constructor(private firestore: AngularFirestore) { }

    getProjects(): Observable<Project[]> {
        return this.firestore.collection<Project>('projects').valueChanges({idField: 'id'});
    }

    addProjects(project: Project) {
        this.firestore.collection("projects").add({
            image: project.image,
            title: project.title,
            desc: project.desc,
            html: project.html,
            tags: project.tags
        });
    }

    updateProject(id: string, project: Project) {
        this.firestore.collection("projects").doc(id).update(project);
    }

    deleteProject(id: string) {
        this.firestore.collection("projects").doc(id).delete();
    }

    getProjectById(id: string): Observable<Project[]> {
        return this.firestore.collection<Project>('projects', ref => ref.where("id", "==", id)).valueChanges({idField:'id'});
    }

    getProjectsByTitle(title: string): Observable<Project[]> {
        return this.firestore.collection<Project>('projects', ref => ref.where("title", "==", title)).valueChanges({idField:'id'});
    }

    getProjectsTags(): Observable<Project[]> {
        return this.firestore.collection<Project>('projects', ref => ref.orderBy("tags")).valueChanges({idField:'id'});
    }

    getProjectsByTags(tag: string): Observable<Project[]> {
        return this.firestore.collection<Project>('projects', ref => this.queryByTags(tag, ref)).valueChanges({idField:'id'});
    }

    private queryByTags(tag: string, ref: any) {
        return ref.where("tags", "array-contains-any", [tag]);
    }
    
    checkAllowedUsers(email: string): Observable<any[]> {
        return this.firestore.collection('allowed_users', ref => this.queryByEmail(email, ref)).valueChanges();
    }

    private queryByEmail(email: string, ref: any) {
        return ref.where("email", "==", email);
    }
}
