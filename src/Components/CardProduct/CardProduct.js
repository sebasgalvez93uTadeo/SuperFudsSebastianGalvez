import React, { Fragment, useState } from 'react';
import { Card, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

// Import Css
import './Styles/StylesCardProduct.scss';

const CardProduct = ({productos, productsCart}) => {

    // eslint-disable-next-line no-restricted-globals
    const screenSave = screen.width;
    //Hooks
    const [isShown, setIsShown] = useState(false);

    // agregar productos al carrito y enviar a app.js
    const AddCart = () => {
        productsCart(productos);
    }

    const sellos = productos.sellos.map((sellos) =>
        <Fragment>
            <OverlayTrigger
                placement={'right'}
                key={productos.id}
                overlay={
                    <Tooltip className="tooltipProduct" id={`tooltip`}>
                        <span>Producto </span><br></br>
                        <span className="titleSello">{sellos.name}</span>
                    </Tooltip>
                }
                >
                <Image 
                    className="imgSellosProduct" src={sellos.image}
                />
            </OverlayTrigger>
        </Fragment>
    );

    return (
        <div>
            {screenSave > 770 ? (
                <Card
                key={productos.id}
                className="cardProduct"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                    <div className="ctnSellosProduct">
                        {sellos}
                    </div>
                    <Card.Img className="imgCardProduct" variant="top" src={productos.thumbnail} />
                    <Card.Body className="cardBodyProduct">
                        <Card.Text className="textCardProduct"><span className="storeTitleCard">SuperFüds</span> <span className="pillProductCard">{productos.net_content}</span></Card.Text>
                        <Card.Title className="titleCardProduct">{productos.title}</Card.Title>
                        <Card.Text className="textCardProduct"><span className="storePriceCard">$<NumberFormat className="priceNumberProduct" value={productos.price_real} thousandSeparator={true} displayType={'text'} /></span><span className="numberUnitsProduct">&nbsp;X {productos.units_sf} unids</span></Card.Text>
                    </Card.Body>
                    {isShown ? <Button onClick={AddCart} className="btnAddProductCart" variant="success">Agregar al carrito</Button> : null}
                </Card>
            ) : (
                <Card
                key={productos.id}
                className="cardProduct"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                    <div className="ctnSellosProduct">
                        {sellos}
                    </div>
                    <Card.Img className="imgCardProduct" variant="top" src={productos.thumbnail} />
                    <Card.Body className="cardBodyProduct">
                        <Card.Text className="textCardProduct"><span className="storeTitleCard">SuperFüds</span> <span className="pillProductCard">{productos.net_content}</span></Card.Text>
                        <Card.Title className="titleCardProduct">{productos.title}</Card.Title>
                        <Card.Text className="textCardProduct"><span className="storePriceCard">$<NumberFormat className="priceNumberProduct" value={productos.price_real} thousandSeparator={true} displayType={'text'} /></span><span className="numberUnitsProduct">&nbsp;X {productos.units_sf} unids</span></Card.Text>
                    </Card.Body>
                    <Button onClick={AddCart} className="btnAddProductCart" variant="success">Agregar al carrito</Button>
                </Card>
            )}
        </div>
     );
}
 
export default CardProduct;