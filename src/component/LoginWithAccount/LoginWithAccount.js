import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { useContent } from '../../App';
import './LoginWithAccount.css';

const LoginWithAccount = () => {
    const [user, setUser] = useContext(useContent)

    const handleLoginWithAccount = (e) => {

        if(e.target.name === 'googleLogin') {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(res => {
                const {displayName, email, photoURL} = res.user;
                console.log(displayName);
                setUser({
                    name: displayName,
                    email: email,
                    photo: photoURL,
                })
            })
            .catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        }

        if(e.target.name === 'facebookLogin') {

        }
    }
    return (
        <div className='buttons'>

                <button style={{background: '#6cad71'}} name='googleLogin' onClick={handleLoginWithAccount}>Continue with Google</button>

                <button style={{background: '#5297df'}} name='facebookLogin' onClick={handleLoginWithAccount}>Continue with Facebook</button>

        </div>
    );
};

export default LoginWithAccount;