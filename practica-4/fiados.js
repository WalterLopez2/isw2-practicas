const TASA_MORA = 0.05;

function calcularMora(monto, diasVencidos) {
  if (typeof monto !== 'number' || Number.isNaN(monto)) {
    throw new Error('El monto debe ser un número');
  }
  if (monto < 0) {
    throw new Error('El monto no puede ser negativo');
  }
  if (typeof diasVencidos !== 'number' || Number.isNaN(diasVencidos)) {
    throw new Error('Los días vencidos deben ser un número');
  }
  return diasVencidos > 0 ? monto * TASA_MORA : 0;
}

module.exports = { calcularMora };