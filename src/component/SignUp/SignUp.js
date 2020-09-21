import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useContent } from '../../App';
import LoginWithAccount from '../LoginWithAccount/LoginWithAccount';


const SignUp = () => {
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/login" } };

    const [userData, setUserData] = useContext(useContent);

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: false
    })

    const handleChange = (e) => {
        let isValid = true;

        if (e.target.name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            isValid = isEmailValid;
        }
        if (e.target.name === 'password') {
            const isPasswordValid = /\d{1}/.test(e.target.value);
            isValid = isPasswordValid;
        }
        if (e.target.name === 'confirmPassword') {
            const newUserInfo = { ...newUser };
            newUserInfo[e.target.name] = e.target.value;
            setNewUser(newUserInfo);
        }
        if (isValid) {
            const newUserInfo = { ...newUser };
            newUserInfo[e.target.name] = e.target.value;
            setNewUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        if (newUser.email && newUser.password === newUser.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
                .then(res => {

                    const newUserInfo = { ...newUser };
                    newUserInfo.isLoggedIn = true;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setNewUser(newUserInfo);
                    userName(newUser.firstName, newUser.lastName);
                    verifyEmail();
                    history.replace(from);
                    const updateUser = { ...userData };
                    setUserData.name = res.user.displayName;
                    setUserData(updateUser);
                })
                .catch(error => {
                    const newUserInfo = { ...newUser };
                    newUserInfo.isLoggedIn = false;
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setNewUser(newUserInfo);
                    console.log(error.message)
                });
        }

        const userName = (firstName, lastName) => {
            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: firstName + ' ' + lastName
            })
                .then(res => {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        const verifyEmail = () => {
            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(function () {
                // Email sent.
            }).catch(function (error) {
                // An error happened.
            });
        }
        e.preventDefault();
    }

    return (
        <div className='login-page'>
            <div className="container">
                <div className="login-page-content">
                    <h2>Create an Account</h2>
                    <form onSubmit={handleSubmit}>
                        <input onBlur={handleChange} name='firstName' type="text" placeholder='First Name' required /><br />
                        <input onBlur={handleChange} name='lastName' type="text" placeholder='Last Name' required /><br />
                        <input onBlur={handleChange} name='email' type="email" placeholder='Your Email' required /><br />
                        <input onBlur={handleChange} name='password' type="password" placeholder='Your Password' required /><br />
                        <input onBlur={handleChange} name='confirmPassword' type="password" placeholder='Confirm Password' required /><br />
                        <input className='login-button' type="submit" value="Sign Up" /><br />
                    </form>
                    <p style={{marginTop: '0'}}>Already Have an account? <Link to='/login'>Login</Link></p>
                </div>
                <LoginWithAccount></LoginWithAccount>
                {
                    newUser.error && <p style={{ color: 'red' }}>{newUser.error}</p>
                }
            </div>


        </div>
    );
};

export default SignUp;