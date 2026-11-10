# Evidencia - Práctica 4: Mi primera suite de tests

## Qué hice
Implementé la función `calcularMora(monto, diasVencidos)` en JavaScript
puro y armé mi propio mini-runner con `test()`, `assertEqual()` y
`assertThrows()`. Escribí 8 tests con el patrón AAA (Arrange, Act, Assert)
que cubren el camino feliz y los casos borde: 0 días, monto 0, monto
negativo, días negativos y valores que no son números.

## TDD
Primero hice el commit rojo con los tests y la función vacía: 5 de los
8 tests fallaban. Después implementé la lógica mínima y ya pasaron los 8.

Commits:
- `test(fiados): red - caso monto negativo y dias no numericos`
- `feat(fiados): green - calcularMora con validaciones`

Salida de la terminal:

```
Suite: calcularMora
  ✓ cobra 5% de mora cuando el fiado está vencido
  ✓ no cobra mora si no hay días vencidos
  ✓ con monto 0 la mora es 0 aunque esté vencido
  ✓ con 1 día de atraso (límite) ya cobra mora
  ✓ rechaza monto negativo
  ✓ rechaza días que no son número
  ✓ rechaza monto que no es número
  ✓ días negativos (aún no vence) no cobran mora

8 pasaron, 0 fallaron
```

## Lo que aprendí
Ver el test fallar primero me ayudó a entender que sí está probando algo
y no pasa por casualidad. También me di cuenta de que los errores se
esconden en los casos borde, como cuando son 0 días o el monto es 0, y
no tanto en el caso normal. Hacer mi propio mini-runner me mostró que un
framework de tests no es magia, solo ejecuta funciones y compara
resultados.