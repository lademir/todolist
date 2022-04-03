import { UserCredential } from "firebase/auth";

export default interface AuthRepository {

    createUserWithEmailPassword(email: string, password: string): Promise<UserCredential | null>

}