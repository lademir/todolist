import { createContext, useState } from "react";
import AuthRepository from "../../core/authRepository";
import User from "../../models/User";
import RemoteAuthRepository from "../../services/repositories/remoteAuthRepository";



type AuthContextType = {
    user?: User
    loginGoogle: () => Promise<void>,
    createUserWithEmailAndPassword: (email: string, password: string) => Promise<void>
}


const AuthContext = createContext({} as AuthContextType);


export function AuthProvider({ children }: { children: any }) {

    const [user, setUser] = useState<User | undefined>();
    const repo: AuthRepository = new RemoteAuthRepository();

    async function loginGoogle() {
        
    }

    async function createUserWithEmailAndPassword(email: string, password: string) {

        const userCredential = await repo.createUserWithEmailPassword(email, password);
        if(userCredential) {
            console.log(userCredential.user);
        }
    }


    return (
        <AuthContext.Provider value={{
            user,
            loginGoogle,
            createUserWithEmailAndPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;