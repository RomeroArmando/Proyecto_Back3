import express from "express";
import handlebars  from "express-handlebars";
import initSocket from "./sockets.js";

import productsRouter from '../routes/products.router.js'
import routerCart from "../routes/cart.router.js";
import config from './config.js';

const app = express();



const httpServer = app.listen(config.PORT, () => {

    console.log(`Server activo en puerto ${config.PORT}`);


    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/api/products', productsRouter)
    app.use('/api/cart', routerCart)

});