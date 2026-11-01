Practica 3 - Antes del refactor

Clase Pedido: diseño original

class Pedido {



&#x20; procesarPedido(productos, cliente) {



&#x20;   // 1. Verificar que existan productos

&#x20;   if (productos.length === 0) {

&#x20;     console.log("El pedido está vacio");

&#x20;     return false;

&#x20;   }



&#x20;   // 2. Validar el stock de cada producto

&#x20;   for (const producto of productos) {

&#x20;     if (producto.stock < producto.cantidad) {

&#x20;       console.log("Stock insuficiente");

&#x20;       return false;

&#x20;     }

&#x20;   }



&#x20;   // 3. Calcular el subtotal

&#x20;   let subtotal = 0;



&#x20;   for (const producto of productos) {

&#x20;     subtotal += producto.precio \* producto.cantidad;

&#x20;   }



&#x20;   // 4. Calcular el ISV

&#x20;   const isv = subtotal \* 0.15;



&#x20;   // 5. Calcular el total

&#x20;   const total = subtotal + isv;



&#x20;   // 6. Guardar el pedido en la base de datos

&#x20;   const conexion = new MySQLConnection();

&#x20;   conexion.connect();

&#x20;   conexion.query("INSERT INTO pedidos VALUES (?)", {

&#x20;     cliente: cliente.nombre,

&#x20;     subtotal: subtotal,

&#x20;     isv: isv,

&#x20;     total: total

&#x20;   });



&#x20;   // 7. Actualizar el inventario

&#x20;   for (const producto of productos) {

&#x20;     conexion.query(

&#x20;       "UPDATE productos SET stock = stock - ? WHERE id = ?",

&#x20;       \[producto.cantidad, producto.id]

&#x20;     );

&#x20;   }



&#x20;   // 8. Imprimir el ticket

&#x20;   console.log("========== TICKET ==========");

&#x20;   console.log("Cliente: " + cliente.nombre);

&#x20;   console.log("Subtotal: " + subtotal);

&#x20;   console.log("ISV: " + isv);

&#x20;   console.log("Total: " + total);

&#x20;   console.log("============================");



&#x20;   // 9. Enviar WhatsApp al cliente

&#x20;   const whatsapp = new WhatsAppClient();

&#x20;   whatsapp.send(

&#x20;     cliente.telefono,

&#x20;     "Su pedido fue procesado. Total: " + total

&#x20;   );



&#x20;   // 10. Confirmar operación

&#x20;   console.log("Pedido procesado correctamente");



&#x20;   return true;

&#x20; }

}

