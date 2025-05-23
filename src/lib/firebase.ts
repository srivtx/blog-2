
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc,
  doc, 
  addDoc, 
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmYN2v1Rfy2jkWo9jRSZkZ0VAMeAhVAjQ",
  authDomain: "project-2-7023c.firebaseapp.com",
  projectId: "project-2-7023c",
  storageBucket: "project-2-7023c.firebasestorage.app",
  messagingSenderId: "389498239361",
  appId: "1:389498239361:web:f19d4d431a5d95c22c5080"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Post type
export interface Post {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('publishedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Post));
};

// Get a post by slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef);
  const snapshot = await getDocs(q);
  
  const post = snapshot.docs.find(doc => doc.data().slug === slug);
  
  if (!post) return null;
  
  return {
    id: post.id,
    ...post.data()
  } as Post;
};

// Get a post by id
export const getPostById = async (id: string): Promise<Post | null> => {
  const postRef = doc(db, 'posts', id);
  const postSnap = await getDoc(postRef);
  
  if (!postSnap.exists()) return null;
  
  return {
    id: postSnap.id,
    ...postSnap.data()
  } as Post;
};

// Create a new post
export const createPost = async (postData: Omit<Post, 'id' | 'publishedAt' | 'updatedAt'>): Promise<string> => {
  const postsRef = collection(db, 'posts');
  
  const docRef = await addDoc(postsRef, {
    ...postData,
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  return docRef.id;
};

// Update a post
export const updatePost = async (id: string, postData: Partial<Omit<Post, 'id' | 'publishedAt' | 'updatedAt'>>): Promise<void> => {
  const postRef = doc(db, 'posts', id);
  
  await updateDoc(postRef, {
    ...postData,
    updatedAt: serverTimestamp()
  });
};

// Auth functions
export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const signOut = async () => {
  return await firebaseSignOut(auth);
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, db };
