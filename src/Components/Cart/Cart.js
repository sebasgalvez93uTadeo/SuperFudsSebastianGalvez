import React, { Fragment } from 'react';
import { Modal, Table, Image } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

// importar imagenes
import IconTrash from './Img/IconTrash.svg';
import iconEmptyCart from './Img/iconEmptyCart.svg';
import iconLessCart from './Img/iconLessCart.svg';
import iconLessCartGray from './Img/iconLessCartGray.svg';
import iconMoreCart from './Img/iconMoreCart.svg';

// importar scss
import './Styles/StylesCart.scss'

const Cart = ({carrito, deleteProduct, modal, hideCart, addCart, removeCart}) => {

    // eslint-disable-next-line no-restricted-globals
    const screenSave = screen.width;

    let listProductsCart = [];

    // validar si un elemento ya esta en el carrito
    const filter = new Set(carrito);
    let result = [...filter];

    const validationLocalStorage = () => {
        if(result.length !== 0) {
            listProductsCart = result.map((productoscarrito) => 
            <Fragment>
                {screenSave > 770 ? (
                    <tr>
                        <td className="tdCartProducts">
                            <Image className="imgProductCart" src={productoscarrito.thumbnail} />
                        </td>
                        <td className="tdCartProducts">
                            <span className="titleProductCart">{productoscarrito.title}</span><br></br>
                            <span className="txtUnitsProduct">X {productoscarrito.units_sf} Unids - {productoscarrito.net_content} c/u</span><br></br>
                            <span className="txtBrandProducts">{productoscarrito.supplier}</span><br></br>
                        </td>
                        <td className="tdCartProducts">
                            {productoscarrito.qty === 1 ? (
                                <div onClick={() => removeCart(productoscarrito)} className="lessItemGrey"><Image className="iconUnitsCart" src={iconLessCartGray} fluid/></div>
                            ): (
                                <div onClick={() => removeCart(productoscarrito)} className="lessItem"><Image className="iconUnitsCart" src={iconLessCart} fluid/></div>
                            )}
                            <div className="numberItem">{productoscarrito.qty}</div><div onClick={() => addCart(productoscarrito)} className="moreItem"><Image className="iconUnitsCart" src={iconMoreCart} fluid /></div></td>
                        <td className="tdCartProducts">
                            <span className="storePriceCard">$<NumberFormat className="priceNumberProduct" value={productoscarrito.price_real*productoscarrito.qty} thousandSeparator={true} displayType={'text'} /></span><span className="numberUnitsProduct"></span>
                        </td>
                        <td onClick={() => deleteProduct(productoscarrito.id)} className="tdCartProducts"><Image className="iconTrash" src={IconTrash} /></td>
                    </tr>
                ) : (
                    <tr className="trTableCart">
                        <td className="tdCartProducts">
                            <Image className="imgProductCart" src={productoscarrito.thumbnail} />
                        </td>
                        <td className="tdCartProducts description">
                            <span className="titleProductCart">{productoscarrito.title}</span><br></br>
                            <span className="txtUnitsProduct">X {productoscarrito.units_sf} Unids - {productoscarrito.net_content} c/u</span><br></br>
                            <span className="txtBrandProducts">{productoscarrito.supplier}</span><br></br>
                        </td>
                        <td className="tdCartProducts">
                            <div onClick={() => addCart(productoscarrito)} className="moreItem"><Image className="iconUnitsCart" src={iconMoreCart} fluid /></div>
                            <div className="numberItem">{productoscarrito.qty}</div>
                            {productoscarrito.qty === 1 ? (
                                <div onClick={() => removeCart(productoscarrito)} className="lessItemGrey"><Image className="iconUnitsCart" src={iconLessCartGray} fluid/></div>
                            ): (
                                <div onClick={() => removeCart(productoscarrito)} className="lessItem"><Image className="iconUnitsCart" src={iconLessCart} fluid/></div>
                            )}
                            </td>
                        <td className="tdCartProducts">
                            <span className="storePriceCard">$<NumberFormat className="priceNumberProduct" value={productoscarrito.price_real*productoscarrito.qty} thousandSeparator={true} displayType={'text'} /></span><span className="numberUnitsProduct"></span>
                        </td>
                        <td onClick={() => deleteProduct(productoscarrito.id)} className="tdCartProducts"><Image className="iconTrash" src={IconTrash} /></td>
                    </tr>
                )}
            </Fragment>
            );
        } else {
            listProductsCart = (<div className="emptyCart">No hay productos en el carrito</div>);
        }
    }
    validationLocalStorage();
    
    return (
        <Modal dialogClassName="modalCart" contentClassName="boxModalCart" show={modal} >
            <Modal.Header className="closeModal" closeButton onClick={() => hideCart(false)}>
            <Modal.Title className="titleCart" onClick={() => hideCart(false)}>Volver a la tienda</Modal.Title>
            </Modal.Header>
            <Modal.Title className="titleCart2">Carrito de compras <span className="numberItems"><span className="numberItemsTotal">{carrito.length}</span>&nbsp;items</span></Modal.Title>
            <Modal.Body className="bodyModalCart">
                {carrito.length !== 0 ? (
                    <Table className="tableCart" striped bordered hover>
                        <thead>
                            <tr>
                            <th className="tdCartProducts th">Item</th>
                            <th className="tdCartProducts th"></th>
                            <th className="tdCartProducts th">Cant</th>
                            <th className="tdCartProducts th">Precio</th>
                            <th className="tdCartProducts"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProductsCart}
                        </tbody>
                    </Table>
                ): (
                    <div className="emptyCart">
                        <Image className="imageEmptyCart" fluid src={iconEmptyCart} /><br></br>
                        <span className="txtEmptyCart">Aún no tienes productos agregados a tu carrito de compras</span>
                    </div>
                )}
            </Modal.Body>
        </Modal>
     );
}
 
export default Cart;