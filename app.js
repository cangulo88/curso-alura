// Obtener eventos del mes activo
const currentMonthStart = calendar.view.currentStart;
const currentMonthEnd = calendar.view.currentEnd;
const monthEvents = calendar.getEvents().filter(e =>
  e.start >= currentMonthStart && e.start < currentMonthEnd
);

const summary = monthEvents.map(e => {
  return `Habitación ${e.extendedProps.room}, Cliente: ${e.extendedProps.client}, Desde: ${e.start.toLocaleString()}, Hasta: ${e.end.toLocaleString()}`;
}).join('\\n');

// Enviar al backend
fetch('http://localhost:3000/send-reservas-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'c.angulo.88@gmail.com',
    subject: 'Resumen de reservas del mes',
    body: summary
  })
});
