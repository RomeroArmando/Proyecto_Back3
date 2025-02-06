import { Router } from "express";

const router = Router();

import { productsManager } from "../src/productsManager.js";

const managerProd = new productsManager('./product_manager.json')

await managerProd.init();

export const users = await managerProd.getProducts()

router.get('/', (req, res) => {

    console.log(users);
    res.status(200).send({ error: null, data: users });

});

router.get('/realtimeproducts', (req, res) => {
    
    const data = users;

    //console.log(data);
    
    res.status(200).render('realtimeproducts', data);

});

router.post('/', (req, res) => { 
    const { title, description, code, price, status, stock, category } = req.body;
    
    if (title != '' && description != '') {
        const maxId = Math.max(...users.map(element => +element.id));
        var id = maxId;

        console.log(maxId)

        if (maxId == '-Infinity'){

            id = 1

        } else {

            id = id + 1;

        }
        const newUser = { id: id, title: title, description: description , code: code, price: price, status: status, stock: stock, category: category};
        users.push(newUser);
        managerProd.createProducts(newUser);
        
        res.status(200).send({ error: null, data: newUser, file: req.file });
        
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }


});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);

    
    if (index > -1) {
        console.log(users);
        users[index] = req.body;
        res.status(200).send({ error: null, data: users[index] });

    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
    

});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    
    if (index > -1) {
        users.splice(index, 1);
        
        res.status(200).send({ error: null, data: 'producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});


export default router;