const { calcularMora } = require('./fiados');

// ---- Mini-runner ----
let pasaron = 0;
let fallaron = 0;

function test(nombre, fn) {
  try {
    fn();
    console.log('  ✓ ' + nombre);
    pasaron++;
  } catch (e) {
    console.log('  ✗ ' + nombre + ' -> ' + e.message);
    fallaron++;
  }
}

function assertEqual(actual, esperado) {
  if (actual !== esperado) {
    throw new Error('esperado ' + esperado + ' pero fue ' + actual);
  }
}

function assertThrows(fn) {
  try {
    fn();
  } catch (e) {
    return;
  }
  throw new Error('se esperaba un error y no se lanzó');
}

// ---- Tests ----
console.log('Suite: calcularMora');

test('cobra 5% de mora cuando el fiado está vencido', () => {
  const monto = 100;
  const dias = 5;
  const mora = calcularMora(monto, dias);
  assertEqual(mora, 5);
});

test('no cobra mora si no hay días vencidos', () => {
  const mora = calcularMora(100, 0);
  assertEqual(mora, 0);
});

test('con monto 0 la mora es 0 aunque esté vencido', () => {
  const mora = calcularMora(0, 10);
  assertEqual(mora, 0);
});

test('con 1 día de atraso (límite) ya cobra mora', () => {
  const mora = calcularMora(200, 1);
  assertEqual(mora, 10);
});

test('rechaza monto negativo', () => {
  assertThrows(() => calcularMora(-50, 3));
});

test('rechaza días que no son número', () => {
  assertThrows(() => calcularMora(100, 'tres'));
});

test('rechaza monto que no es número', () => {
  assertThrows(() => calcularMora('cien', 3));
});

test('días negativos (aún no vence) no cobran mora', () => {
  const mora = calcularMora(100, -2);
  assertEqual(mora, 0);
});

// ---- Resumen ----
console.log('\n' + pasaron + ' pasaron, ' + fallaron + ' fallaron');
if (fallaron > 0) process.exit(1);