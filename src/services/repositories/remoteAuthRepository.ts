import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import AuthRepository from '../../core/authRepository';
import { auth } from '../auth';

export default class RemoteAuthRepository implements AuthRepository {


    async createUserWithEmailPassword(email: string, password: string): Promise<UserCredential | null> {
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error: any) {
            console.log(error.code);
            console.log(error.message);
            return null;
        }

        
    }
}