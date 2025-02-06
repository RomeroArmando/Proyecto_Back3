import { Server } from "socket.io";
import { users } from "../routes/products.router.js";

const initSocket = (httpServer) => {

    const messages = users;

    //console.log(messages);

    const io = new Server(httpServer);
    console.log('servicio socket.io activo');

    io.on('connection', client => {

        console.log(`cliente conectado, id ${client.id} desde ${client.handshake.address}`);

        client.on('new_user_data', data => {
    
            client.emit('productos', messages);
            //console.log(messages);

            client.broadcast.emit('new_user', data);

        });

        client.on('new_own_msg', data => {
            messages.push(data);
            // Reenvía mensaje a TODOS los clientes conectados, INCLUYENDO el que mandó el msj original
            io.emit('new_general_msg', data);
        });

        
    });

    return io;

}

export default initSocket;