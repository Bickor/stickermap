import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MapComponent from './mapComponent';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import data from "./secrets.json"

const emails = data["emails"];

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isKnown, setIsKnown] = useState(false)

    function makeUserLogIn() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // Only allow those with access to enter.
            const email = result.user.email
            for (let i = 0; i < emails.length; i++) {
                // Check if the current email matches the given email
                if (emails[i] === email) {
                    // If a match is found, return true
                    setIsKnown(true);
                }
            }
            setIsLoggedIn(true); // Update the state to indicate the user is logged in
        }).catch((error) => {
            alert("Something went wrong while signing in:" + error.code + "," + error.message)
        });
    }

    return (
        <div>
            {(() => {
                if (isLoggedIn && isKnown) {
                    return (
                        <div>
                            <Sidebar />
                            <MapComponent />
                        </div>
                    );
                } else if (!isLoggedIn && !isKnown) {
                    return (
                        <div>
                            <button onClick={makeUserLogIn}>Login</button>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h1>You don't have access.</h1>
                        </div>
                    );
                }
            })()}
        </div>
    );
}

export default Home;