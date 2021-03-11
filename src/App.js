import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

// import componentes
import Header from './Components/Header/Header';
import CardProduct from './Components/CardProduct/CardProduct';
import Cart from './Components/Cart/Cart';

function App() {

  // Settings for slider
  const settingsSlide = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 700,
    slidesToShow: 7,
    slidesToScroll: 7,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
          dots: false,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          dots: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          dots: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  
  // Hooks
  const [productos, guardarProductos] = useState([]);
  const [carrito, guardarCarrito] = useState([]);
  const [newCart, guardarNewCarrito] = useState([]);
  const [modal, guardarModal] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const url = `https://superfuds-assets.s3-sa-east-1.amazonaws.com/utils/product.json`;
      const resultado = await axios.get(url);
      guardarProductos(resultado.data);
    }
    getProducts();
  }, []);

  // Recibir productos de cardProduct para carrito
  const productsCart = (result) => {
    guardarCarrito([...carrito, result]);
  }

  // agregar campo para realizar conteo de unidades
  const clearCart = () => {
    const newCarrito = [];
    if(carrito.length > 0) {
      for (let c = 0; c < carrito.length; c+=1) {
        carrito[c].qty = 0;
        newCarrito.push(carrito[c]);
        for (let r = 0; r < carrito.length; r+=1) {
          if (parseFloat(carrito[c].id) === parseFloat(carrito[r].id)) {
            carrito[c].qty += 1;
          }
        }
      }
    }
    localStorage.setItem('productosCarrito', JSON.stringify(newCarrito));
    guardarNewCarrito(newCarrito);
  }

  // agregar unidad del producto en el carrito
  const addCart = (product) => {
    const newCarrito = [];
    if (carrito.length > 0) {
        for (let c = 0; c < carrito.length; c += 1) {
            newCarrito.push(carrito[c]);
        }
    }
    newCarrito.push(product);
    guardarCarrito(newCarrito);
  };

  // quitar unidad del producto en el carrito
  const removeCart = (product) => {
      const newCarrito = [];
      let first = 0;
      if (carrito.length > 0) {
          for (let c = 0; c < carrito.length; c += 1) {
              if (carrito[c].id !== product.id) {
                  newCarrito.push(carrito[c]);
              } else {
                  first += 1;
                  if (first === 0 || first > 1) {
                    newCarrito.push(carrito[c]);
                  }
              }
          }
      }
      guardarCarrito(newCarrito);
  };

  useEffect(() => {
    clearCart();
  }, [carrito]);

  // Funcion que elimina un producto por si id
  const deleteProduct = id => {
    const newCart = carrito.filter( carrito => carrito.id !== id )
    guardarCarrito(newCart);
  }

  // activar modal carrito
  const showCart = () => {
    guardarModal(true);
  }

  // desactivar modal carrito
  const hideCart = () => {
    guardarModal(false);
  }

  const listProducts = productos.map ((productos) => 
    <CardProduct
      key={productos.id}
      productos={productos}
      productsCart={productsCart}
    />
  );

  return (
    <div>
      <Header showCart={showCart} countProducts={carrito.length}/>
      <div className="ctnTitleSection">
        <span className="titleSection">Nuevo en SuperFüds</span>
        <span className="viewMoreTitleSection">Ver más</span>
      </div>
      <div className="ctnSlideProducts">
        <Slider {...settingsSlide}>
          {listProducts}
        </Slider>
      </div>
      <Cart modal={modal} hideCart={hideCart} deleteProduct={deleteProduct} carrito={newCart} addCart={addCart} removeCart={removeCart} />
    </div>
  );
}

export default App;
