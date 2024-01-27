import React, { createContext, useState, useEffect } from 'react'
import { cartAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
export const Authcontext = createContext(null);

export const AuthcontextProvider = (props) => {

    let [currentuser, setCurrentUser] = useState();
    let [loading, setLoading] = useState(false)

    let loginFn = (email, password) => {
        return signInWithEmailAndPassword(cartAuth, email, password)
    }

    let signupFn = (email, password) => {
        return createUserWithEmailAndPassword(cartAuth, email, password)
    }

    let logoutFn = () => { 
        // console.log("Logout fn is ruuninng");
        return signOut(cartAuth);
    }

    useEffect(() => {
        const unsubscribe = cartAuth.onAuthStateChanged(user => {
            // console.log(user);
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    let values = {currentuser,loginFn,signupFn, logoutFn}
    return (
        <Authcontext.Provider value={values}>{!loading && props.children}</Authcontext.Provider>
    )
}
