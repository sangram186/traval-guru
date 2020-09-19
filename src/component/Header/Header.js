import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../Image/Logo.png';
import { useContent } from '../../App';

const Header = () => {
    const [user, setUser] = useContext(useContent)
    return (
        <div style={{ backgroundColor: 'white'}}>
            <div className='container'>
                <Navbar className='navBar-style' expand="lg">
                    <Navbar><Link to='/'><img src={Logo} alt="" /></Link></Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form inline className='ml-4'>
                            <FormControl type="text" placeholder="Search Yor destination" className="mr-sm-2" />
                        </Form>
                        <Nav className="ml-auto nav-item">
                            <Nav><Link to='/news'>News</Link></Nav>
                            <Nav><Link to='/destination'>Destination</Link></Nav>
                            <Nav><Link to='/blog'>Blog</Link></Nav>
                            <Nav><Link to='/contact'>Contact</Link></Nav>
                            <Nav><Link className='login-button-header' to='/login'>{user.name ? `${user.name}` : 'Login'}</Link></Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;