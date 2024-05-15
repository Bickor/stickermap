import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MapComponent from './mapComponent';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function makeUserLogIn() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            setIsLoggedIn(true); // Update the state to indicate the user is logged in
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <Sidebar />
                    <MapComponent />
                </div>
            ) : (
                <div>
                    <button onClick={makeUserLogIn}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Home;