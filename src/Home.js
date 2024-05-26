import React from "react";
import Sidebar from "./Sidebar";
import MapComponent from "./mapComponent";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import data from "./secrets.json";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./config.js";

const emails = data["emails"];

export default class Home extends React.Component {
  state = {
    totalMarkers: 0,
    isLoggedIn: false,
    isKnown: false,
  };

  componentDidMount() {
    this.readCount();
    this.readCountFromMarkers();
  }

  async readCount() {
    const querySnapshot = await getDocs(collection(db, "total_markers"));
    let count = 0;
    let totalMarkersId = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      count = data.Total;
      totalMarkersId = doc.id;
    });
    this.setState({ totalMarkers: count });
  }

  async readCountFromMarkers() {
    const querySnapshot = await getDocs(collection(db, "markers"));
    let count = 0;
    querySnapshot.forEach((doc) => {
      count++;
    });
    console.log(count);
  }

  makeUserLogIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Only allow those with access to enter.
        const email = result.user.email;
        for (let i = 0; i < emails.length; i++) {
          // Check if the current email matches the given email
          if (emails[i] === email) {
            // If a match is found, return true
            this.setState({ isKnown: true });
          }
        }
        this.setState({ isLoggedIn: true }); // Update the state to indicate the user is logged in
      })
      .catch((error) => {
        alert(
          "Something went wrong while signing in:" +
            error.code +
            "," +
            error.message,
        );
      });
  };

  updateTotalMarkers = (newTotal) => {
    this.setState({ totalMarkers: newTotal });
  };

  render() {
    return (
      <div>
        {(() => {
          if (this.state.isLoggedIn && this.state.isKnown) {
            return (
              <div>
                <Sidebar totalMarkers={this.state.totalMarkers} />
                <MapComponent
                  totalMarkers={this.state.totalMarkers}
                  updateTotalMarkers={this.updateTotalMarkers}
                />
              </div>
            );
          } else if (!this.state.isLoggedIn && !this.state.isKnown) {
            return (
              <div>
                <button onClick={this.makeUserLogIn}>Login</button>
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
}

