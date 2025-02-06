import { Router } from "express";

import { users } from "./products.router.js";

const routerCart = Router();

import { cartManager } from "../src/cartManager.js";

const managerCart = new cartManager('./cart_manajer.json');

await managerCart.init();

export const cart = await managerCart.getCart();

const carrito = [];

routerCart.get('/', (req, res) => {

    console.log(cart);
    res.status(200).send({ error:null, data: cart })

})


routerCart.post('/', (req, res) => {

    const maxId = Math.max(...cart.map(element => +element.id))
    var id = maxId;

    //console.log(maxId);

    if (maxId == '-Infinity'){

        id = 1;

    } else {

        id = id + 1;

    }

    const newCart = { id: id, products: []}
    cart.push(newCart);
    managerCart.createCart(newCart);
    res.sendStatus(200).send({ error: null, data: cart, file: req.file })

})


routerCart.get('/:cid', (req, res) => {

    const id = parseInt(req.params.cid);
    const index = cart.findIndex(element => element.id === id);


    if ( index > -1 ){

        console.log(cart[index])
        res.status(200).send({ error: null, data: cart[index] });

    } else {

        console.log("el carro no existe")
        res.status(404).send({ error: 'No se encuentra el carrito con es id', data: [] });

    }

});

routerCart.post('/:cid/product/:pid', (req, res) => {

    const id_c = parseInt(req.params.cid);
    const index_c = cart.findIndex(element => element.id === id_c);

    const id_p = parseInt(req.params.pid);
    const index_p = users.findIndex(element => element.id === id_p);

    //console.log("prueba del prod");
    //console.log(cart[index_c].products);

    const PC = cart[index_c].products;
    const index_pc = PC.findIndex(element => element.id === id_p);

    console.log("PC")
    console.log(PC)
    console.log("INDEX PC")
    console.log(index_pc)

    if ( index_c > -1 ){
        
        //console.log(cart[index_c])

        if ( index_p > -1 ){

           // console.log(users[index_p]);

            var cant = 0;            
            if ( index_pc > -1 ) {

                cant = cart[index_c].products[index_pc].cantidad + 1;
                cart[index_c].products[index_pc].cantidad = cant
                managerCart.updatecart(cart);
                console.log(cart)

            } else {


                cant = 1;
                const newProd = { id: index_p + 1, cantidad: cant }
                cart[index_c].products.push(newProd)
                managerCart.updatecart(cart);
                console.log(cart)

            }  
            
            res.status(200).send({ error: null, data: cart, file: req.file });

        } else {

            res.status(400).send({ error: 'No se encuentra el producto con es id', data: [] });

        }

    } else {

        console.log("el carro no existe")
        res.status(404).send({ error: 'No se encuentra el carrito con es id', data: [] });

    }

});

//falta el delete 


export default routerCart;

