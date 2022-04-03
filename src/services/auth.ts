import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth'

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export {auth, googleProvider}

