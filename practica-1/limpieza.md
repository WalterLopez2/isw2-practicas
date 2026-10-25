\# Práctica 1: Limpieza de código



\## 1. Código original



Fragmento tomado del archivo HTML del Sistema de Gestión Hospitalaria:



```javascript

async function loadStats() {

&#x20;   try {

&#x20;       const response = await fetch('http://localhost:5000/api/pacientes/stats');

&#x20;       const stats = await response.json();

&#x20;       document.getElementById('waitingCount').textContent = stats.waiting;

&#x20;       document.getElementById('priorityCount').textContent = stats.priority;

&#x20;       document.getElementById('attendedCount').textContent = stats.attended;

&#x20;       document.getElementById('urgentCount').textContent = stats.priority;

&#x20;   } catch (e) {

&#x20;       showNotification('No se pudo cargar estadísticas reales', 'error');

&#x20;   }

}



document.addEventListener('DOMContentLoaded', () => {

&#x20;   loadStats();

});



updateSystemStats();

setInterval(updateSystemStats, 30000);

```



\## 2. Code smells identificados



\### Magic Number / Hard-coded URL

La dirección del servidor está escrita directamente dentro de la función. Esto dificulta cambiar el entorno de ejecución y mantener la configuración.



\### Duplicated Code

El valor de `stats.priority` se asigna tanto a `priorityCount` como a `urgentCount`. Si ambos elementos deben mostrar el mismo dato, conviene centralizar esa actualización.



\### Long Function / Multiple Responsibilities

La función `loadStats()` se encarga de consultar la API, procesar la respuesta y actualizar varios elementos del DOM. Separar estas responsabilidades facilita las pruebas y el mantenimiento.



\### Error Handling Deficiency

La respuesta HTTP no se valida con `response.ok`. Además, el código no registra el error original, por lo que resulta más difícil diagnosticar fallos del servidor o de la conexión.



\### Conflicting Sources of State

El código carga estadísticas reales mediante `loadStats()`, pero también ejecuta `updateSystemStats()` y la repite cada 30 segundos. Esta última función modifica los números de forma aleatoria, lo que puede sobrescribir o contradecir los datos reales.



\## 3. Versión refactorizada



La siguiente versión centraliza la actualización de los contadores, valida la respuesta HTTP y elimina la modificación aleatoria de las estadísticas.



```javascript

const API\_STATS\_URL = 'http://localhost:5000/api/pacientes/stats';



function renderStats(stats) {

&#x20;   document.getElementById('waitingCount').textContent = stats.waiting;

&#x20;   document.getElementById('priorityCount').textContent = stats.priority;

&#x20;   document.getElementById('urgentCount').textContent = stats.priority;

&#x20;   document.getElementById('attendedCount').textContent = stats.attended;

}



async function loadStats() {

&#x20;   try {

&#x20;       const response = await fetch(API\_STATS\_URL);



&#x20;       if (!response.ok) {

&#x20;           throw new Error(`Error HTTP: ${response.status}`);

&#x20;       }



&#x20;       const stats = await response.json();

&#x20;       renderStats(stats);

&#x20;   } catch (error) {

&#x20;       console.error('Error al cargar estadísticas:', error);

&#x20;       showNotification('No se pudieron cargar las estadísticas reales');

&#x20;   }

}



document.addEventListener('DOMContentLoaded', loadStats);

```



Para que las estadísticas sigan actualizándose, se puede programar una nueva consulta a la API cada 30 segundos, en lugar de modificar los números aleatoriamente:



```javascript

document.addEventListener('DOMContentLoaded', () => {

&#x20;   loadStats();

&#x20;   setInterval(loadStats, 30000);

});

```



\## 4. Mejoras realizadas



\- Se extrajo la actualización del DOM a `renderStats()`.

\- Se centralizó la dirección de la API en una constante.

\- Se agregó la validación de la respuesta HTTP.

\- Se registran los errores para facilitar el diagnóstico.

\- Se evita que las estadísticas aleatorias contradigan los datos reales.

\- Se conserva la funcionalidad principal: mostrar los pacientes en espera, los de alta prioridad y los atendidos.



\*\*Conclusión:\*\* La refactorización mejora la legibilidad, reduce responsabilidades dentro de una función y evita que dos mecanismos diferentes modifiquen las mismas estadísticas. La versión propuesta debe probarse con la API disponible y verificarse que los elementos HTML existan antes de usarla en producción.

