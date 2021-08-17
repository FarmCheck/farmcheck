import firebase from 'firebase';
import { env } from 'env';

const firebaseConfig = env.firebase;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
