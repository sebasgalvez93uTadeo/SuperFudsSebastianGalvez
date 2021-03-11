import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap';

// Importar imagenes
import logoSuperFuds from './Img/logoSuperFuds.svg';
import IconSearch from './Img/IconSearch.svg';
import IconCart from './Img/IconCart.svg';
import ImageProfile from './Img/ImageProfile.jpg'

//Importar Css
import './Styles/StylesHeader.scss';

const Header = ({countProducts, showCart}) => {

    // eslint-disable-next-line no-restricted-globals
    const screenSave = screen.width;

    return (
        <div>
            {screenSave > 770 ? (
                <Navbar bg="light" expand="lg" className="navHeader">
                    <Navbar.Brand href=""><Image src={logoSuperFuds} /></Navbar.Brand>
                    <Form className="navSearch" inline>
                        <FormControl type="text" placeholder="Busca marcas y productos..." className="mr-sm-2" />
                        <Image className="iconSearch" src={IconSearch} />
                    </Form>
                    {/* Desplegable de perfil */}
                    <div className="ctnCartUser">
                        <Button onClick={() => showCart(true)} className="btnCart" variant="link"><Image className="iconCart" src={IconCart} />{countProducts === 0 ? null : (
                            <div className="numberPorductsHe">{countProducts}</div>
                        )}</Button>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="navBarColUser" id="basic-navbar-nav">
                            <Nav className="mr-auto navItemUser">
                                <span className="txtUser">Sebastian Galvez</span>
                            <NavDropdown className="navDropUserTxt" title="Mi Perfil" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Editar Perfil</NavDropdown.Item>
                                <NavDropdown.Item href="#">Cerrar Sesión</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                            <Image className="imgProfileUser" src={ImageProfile} roundedCircle />
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            ): (
                <Navbar bg="light" expand="lg" className="navHeader">
                    <Navbar.Brand href=""><Image src={logoSuperFuds} /></Navbar.Brand>
                    <Button onClick={() => showCart(true)} className="btnCart" variant="link"><Image className="iconCart" src={IconCart} />{countProducts === 0 ? null : (
                            <div className="numberPorductsHe">{countProducts}</div>
                        )}</Button>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="navBarColUser" id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="#home">
                            <span className="txtUser">Sebastian Galvez</span>
                            <Image className="imgProfileUser" src={ImageProfile} roundedCircle />
                        </Nav.Link>
                        <Nav.Link href="" className="txtProfileResp">Editar Perfil</Nav.Link>
                        <Nav.Link href="" className="txtProfileResp">Cerrar Sesión</Nav.Link>

                        </Nav>
                        <Form className="navSearch" inline>
                        <FormControl type="text" placeholder="Busca marcas y productos..." className="mr-sm-2" />
                        <Image className="iconSearch" src={IconSearch} />
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </div>
     );
}
 
export default Header;