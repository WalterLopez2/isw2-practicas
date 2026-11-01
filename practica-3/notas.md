\# Practica 3 - Notas del refactor SOLID



\## Principio S - Responsabilidad única



1\. Se aplico el principio S de SOLID para separar las responsabilidades de la clase Pedido.

2\. Antes del refactor, una sola clase validaba, calculaba, guardaba e imprimia.

3\. Se creó CalculadoraPedido para realizar exclusivamente los cálculos.

4\. Se creó ValidadorPedido para comprobar los productos y el stock.

5\. Se creó PedidoService para coordinar el procesamiento del pedido sin asumir todas las responsabilidades.



\## Principio D - Inversión de dependencias



1\. Se aplico el principio D de SOLID para evitar que el negocio dependa de tecnologías concretas.

2\. El guardado del pedido se realiza mediante el contrato RepositorioPedidos.

3\. El envío de notificaciones se realiza mediante el contrato Notificador.

4\. Las dependencias se inyectan desde afuera mediante el constructor de PedidoService.

5\. Se pueden cambiar las implementaciones de MySQL o WhatsApp sin modificar la lógica principal del negocio.



\## Relación con el decálogo



El principio 9, diseñar para el cambio, se refleja en la separación de responsabilidades y en el uso de abstracciones. El diseño permite adaptar el sistema a nuevas necesidades con menos modificaciones.

