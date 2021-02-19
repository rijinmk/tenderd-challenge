import React, { createContext, useContext, useEffect, useState } from 'react';
import './config'; 
import firebase from 'firebase'; 

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext); 
}

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(); 

    function signup(email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    function signin(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    function logout(email, password){
        return firebase.auth().signOut();
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
           setCurrentUser(user); 
        }); 

        return unsubscribe; 
    }, [])


    const value = {
        currentUser, 
        signup, 
        signin, 
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    ); 
}

export default AuthProvider;