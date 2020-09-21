import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LoginWithAccount from '../LoginWithAccount/LoginWithAccount';
import { useContent } from '../../App';
import './Login.css';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/hotel" } };

    const [user, setUser] = useContext(useContent);
    const handleBlur = e => {
        let isValid = true;

        if (e.target.name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            isValid = isEmailValid;
        }
        if (e.target.name === 'password') {
            const isPasswordValid = /\d{1}/.test(e.target.value);
            isValid = isPasswordValid;
        }
        if (isValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = e => {
        if (user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.isLoggedIn = true;
                    newUserInfo.name = res.user.displayName;
                    setUser(newUserInfo);
                    history.replace(from);
                })
                .catch(function (error) {
                    const errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const resetPassword = email => {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email).then(function () {
            const userInfo = {...user};
            userInfo.passwordResetMessage = 'Check your email to reset Password';
            setUser(userInfo)
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <div className="login-page">
            <div className='container'>
                <div className='login-page-content'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input onBlur={handleBlur} type="email" name="email" required placeholder='Your Email' /><br />
                        <input onBlur={handleBlur} type="password" name="password" required placeholder='Your Password' /><br />
                        <button onClick={() => resetPassword(user.email)}>Forget password</button><br />
                        <input className='login-button' type="submit" value="Login" />
                    </form>
                    <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                </div>
                <LoginWithAccount></LoginWithAccount>
                {
                    user.error && <p style={{ color: 'red' }}>{user.error}</p>
                }
                <p style={{color: 'green'}}>{user.passwordResetMessage}</p>
            </div>
        </div>
    );
};

export default Login;