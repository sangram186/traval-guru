import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../Image/Logo.png';
import { useContent } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";

const Header = () => {
    const [user, setUser] = useContext(useContent);
    const handleLogout = () => {
        firebase.auth().signOut().then(function() {
            const userInfo = {...user};
            userInfo.email = '';
            userInfo.name = '';
            setUser(userInfo);
          }).catch(function(error) {
            console.log(error.message)
          });
    }
    return (
        <div style={{ backgroundColor: 'white' }}>
            <div className='container'>
                <Navbar className='navBar-style' expand="lg">
                    <Navbar><Link to='/'><img src={Logo} alt="" /></Link></Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form inline className='ml-4'>
                            <FormControl type="text" placeholder="Search Yor destination" className="mr-sm-2" />
                        </Form>
                        <Nav className="ml-auto nav-item">
                            <Nav><Link to='/'>Home</Link></Nav>
                            <Nav><Link to='/destination'>Destination</Link></Nav>
                            <Nav><Link to='/blog'>Blog</Link></Nav>
                            <Nav><Link to='/contact'>Contact</Link></Nav>
                            {/* <Nav><Link className='login-button-header' to='/login'>{user.name ? `${user.name}` : 'Login'}</Link></Nav> */}
                            {
                                user.name ?
                                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#">Email: {user.email}</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Tour Origin: {user.tourOrigin}</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Tour Destination: {user.tourDestination}</NavDropdown.Item>
                                        <NavDropdown.Item href="#">From: {user.tourFrom}</NavDropdown.Item>
                                        <NavDropdown.Item href="#">To: {user.tourTo}</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#"><button className='login-button' onClick={handleLogout}>Logout</button></NavDropdown.Item>
                                    </NavDropdown>:
                                    <Nav><Link className='login-button-header' to='/login'>Login</Link></Nav>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;