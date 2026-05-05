import { Injectable } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private db = getFirestore(
    getApps().length ? getApps()[0] : initializeApp(environment.firebase)
  );

  async saveContact(name: string, email: string, message: string): Promise<void> {
    await addDoc(collection(this.db, 'contacts'), {
      name,
      email,
      message,
      createdAt: Timestamp.now(),
    });
  }
}
