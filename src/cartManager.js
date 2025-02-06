import fs from 'fs';

export class cartManager{

    constructor(file){

        this.file = file;

    }

    async init(){

        try {
            
            const exist = await fs.promises.access(this.file);
            console.log('el archivo (cart) existe')

        } catch (err) {
            
            console.log('el archivo (cart) NO EXISTE');
            await fs.promises.writeFile(this.file, JSON.stringify([]));

        }

    }

    async #readCartFile() {

        const cart =await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(cart);

    }

    async createCart(data){

        const products = await this.#readCartFile();
        products.push(data);

        await fs.promises.writeFile(this.file, JSON.stringify(products));
        console.log('carrito agregado')

    }

    async updatecart(data){

        await fs.promises.writeFile(this.file, JSON.stringify(data));
        console.log('carrito actualizado')

    }

    async getCart() {

        return await this.#readCartFile();

    }

}