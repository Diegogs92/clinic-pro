import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, Firestore } from 'firebase/firestore';
import { Office } from '@/types';
import { mockMode } from './firebase';
import { loadFromLocalStorage, saveToLocalStorage } from './mockStorage';

const OFFICES_COLLECTION = 'offices';

// Mock data
let mockOffices: Office[] = loadFromLocalStorage('offices') || [];

export async function listOffices(userId: string): Promise<Office[]> {
  if (mockMode || !db) {
    return mockOffices.filter(o => o.userId === userId);
  }

  const q = query(collection(db as Firestore, OFFICES_COLLECTION), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ ...d.data() as Office, id: d.id }));
}

export async function getOffice(id: string): Promise<Office | null> {
  if (mockMode || !db) {
    return mockOffices.find(o => o.id === id) || null;
  }

  const docRef = doc(db as Firestore, OFFICES_COLLECTION, id);
  const docSnap = await import('firebase/firestore').then(m => m.getDoc(docRef));
  if (!docSnap.exists()) return null;
  return { ...docSnap.data() as Office, id: docSnap.id };
}

export async function createOffice(office: Omit<Office, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = new Date().toISOString();
  const newOffice: Office = {
    ...office,
    id: '',
    createdAt: now,
    updatedAt: now,
  };

  if (mockMode || !db) {
    newOffice.id = `office_${Date.now()}`;
    mockOffices.push(newOffice);
    saveToLocalStorage('offices', mockOffices);
    return newOffice.id;
  }

  const docRef = await addDoc(collection(db as Firestore, OFFICES_COLLECTION), newOffice);
  return docRef.id;
}

export async function updateOffice(id: string, updates: Partial<Office>): Promise<void> {
  const now = new Date().toISOString();
  const payload = { ...updates, updatedAt: now };

  if (mockMode || !db) {
    const idx = mockOffices.findIndex(o => o.id === id);
    if (idx !== -1) {
      mockOffices[idx] = { ...mockOffices[idx], ...payload };
      saveToLocalStorage('offices', mockOffices);
    }
    return;
  }

  const docRef = doc(db as Firestore, OFFICES_COLLECTION, id);
  await updateDoc(docRef, payload);
}

export async function deleteOffice(id: string): Promise<void> {
  if (mockMode || !db) {
    const idx = mockOffices.findIndex(o => o.id === id);
    if (idx !== -1) {
      mockOffices.splice(idx, 1);
      saveToLocalStorage('offices', mockOffices);
    }
    return;
  }

  const docRef = doc(db as Firestore, OFFICES_COLLECTION, id);
  await deleteDoc(docRef);
}
