import fs from 'fs';

export class productsManager{

    constructor(file){

        this.file = file;

    }

    async init(){

        try{

            const exist = await fs.promises.access(this.file);
            console.log('El archivo (products) existe');

        }catch (err){

            console.log('el archivo (products) NO EXISTE');
            await fs.promises.writeFile(this.file, JSON.stringify([]));

        }
    }


    async #readProductsFile() {

        const products = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(products);

    }

    async createProducts(data) {

        const products = await this.#readProductsFile();
        products.push(data);

        await fs.promises.writeFile(this.file, JSON.stringify(products));
        console.log('Producto Agregado');

    }

    async getProducts() {

        return await this.#readProductsFile();

    }

}
