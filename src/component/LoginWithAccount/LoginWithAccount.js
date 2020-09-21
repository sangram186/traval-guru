import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { useContent } from '../../App';
import './LoginWithAccount.css';
import { useHistory, useLocation } from 'react-router-dom';

const LoginWithAccount = () => {
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/hotel" } };

    const [user, setUser] = useContext(useContent)

    const handleLoginWithAccount = (e) => {


        if(e.target.name === 'googleLogin') {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(res => {
                const {displayName, email} = res.user;
                const userInfo = {...user};
                userInfo.name = displayName;
                userInfo.email = email;
                setUser(userInfo);
                history.replace(from);
            })
            .catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        }

        if(e.target.name === 'facebookLogin') {
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(res => {
                const {displayName, email} = res.user;
                const userInfo = {...user};
                userInfo.name = displayName;
                userInfo.email = email;
                setUser(userInfo);
                history.replace(from);
            })
            .catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
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