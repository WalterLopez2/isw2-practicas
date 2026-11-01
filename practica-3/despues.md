\# Practica 3 - Después del refactor



\## Diseño aplicando SOLID



\### 1. Clase CalculadoraPedido



Se encarga unicamente de calcular los importes del pedido.



```javascript

class CalculadoraPedido {

&#x20; calcularSubtotal(productos) {

&#x20;   return productos.reduce(

&#x20;     (total, p) => total + p.precio \* p.cantidad, 0

&#x20;   );

&#x20; }



&#x20; calcularISV(subtotal) {

&#x20;   return subtotal \* 0.15;

&#x20; }



&#x20; calcularTotal(productos) {

&#x20;   const subtotal = this.calcularSubtotal(productos);

&#x20;   const isv = this.calcularISV(subtotal);



&#x20;   return subtotal + isv;

&#x20; }

}

```



\### 2. Clase ValidadorPedido



Se encarga de validar los productos y el stock.



```javascript

class ValidadorPedido {

&#x20; validar(productos) {

&#x20;   if (productos.length === 0) {

&#x20;     return false;

&#x20;   }



&#x20;   for (const producto of productos) {

&#x20;     if (producto.stock < producto.cantidad) {

&#x20;       return false;

&#x20;     }

&#x20;   }



&#x20;   return true;

&#x20; }

}

```



\### 3. Clase PedidoService



Coordina el procesamiento del pedido. No conoce los detalles concretos de la base de datos ni de WhatsApp.



```javascript

class PedidoService {

&#x20; constructor(repositorio, notificador, impresor) {

&#x20;   this.repositorio = repositorio;

&#x20;   this.notificador = notificador;

&#x20;   this.impresor = impresor;



&#x20;   this.validador = new ValidadorPedido();

&#x20;   this.calculadora = new CalculadoraPedido();

&#x20; }



&#x20; procesarPedido(productos, cliente) {

&#x20;   if (!this.validador.validar(productos)) {

&#x20;     return false;

&#x20;   }



&#x20;   const total = this.calculadora.calcularTotal(productos);



&#x20;   const pedido = {

&#x20;     cliente: cliente.nombre,

&#x20;     productos: productos,

&#x20;     total: total

&#x20;   };



&#x20;   this.repositorio.guardar(pedido);

&#x20;   this.impresor.imprimir(pedido);

&#x20;   this.notificador.enviar(cliente, total);



&#x20;   return true;

&#x20; }

}

```



\### 4. Contratos o abstracciones



```javascript

class RepositorioPedidos {

&#x20; guardar(pedido) {

&#x20;   throw new Error("Metodo pendiente de implementar");

&#x20; }

}



class Notificador {

&#x20; enviar(cliente, total) {

&#x20;   throw new Error("Método pendiente de implementar");

&#x20; }

}

```



Las implementaciones concretas pueden utilizar MySQL, Supabase o WhatsApp. Se proporcionan desde afuera mediante inyección de dependencias.



\### Resultado



La nueva estructura separa las responsabilidades y permite cambiar las tecnologías sin modificar la lógica principal del negocio.

