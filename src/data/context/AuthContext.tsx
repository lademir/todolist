import { createContext, useState } from "react";

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

import User from "../../models/User";


type AuthContextType = {
    user?: User

}


const AuthContext = createContext({} as AuthContextType);


export function AuthProvider({ children }: { children: any }) {

    const [user, setUser] = useState<User | undefined>();

    async function login(email: string, password: string) {
        const auth = getAuth();
        
    }

    return (
        <AuthContext.Provider value={{
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;