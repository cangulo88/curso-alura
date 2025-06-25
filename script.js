const productos = [
  { id: 1, nombre: "Cámara de seguridad WiFi", precio: 45000, categoria: "Seguridad", imagen: "https://via.placeholder.com/300?text=Cámara" },
  { id: 2, nombre: "Sensor de movimiento inteligente", precio: 25000, categoria: "Domótica", imagen: "https://via.placeholder.com/300?text=Sensor" },
  { id: 3, nombre: "Rastreador GPS para vehículo", precio: 60000, categoria: "Rastreo GPS", imagen: "https://via.placeholder.com/300?text=GPS" },
  { id: 4, nombre: "Kit de alarma para hogar", precio: 80000, categoria: "Seguridad", imagen: "https://via.placeholder.com/300?text=Alarma" },
  { id: 5, nombre: "Enchufe inteligente WiFi", precio: 18000, categoria: "Domótica", imagen: "https://via.placeholder.com/300?text=Enchufe" }
];

const carrito = [];

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalElement = document.getElementById('total');

function mostrarProductos() {
  productos.forEach(p => {
    const col = document.createElement('div');
    col.classList.add('col-md-6', 'col-xl-4');
    col.innerHTML = `
      <div class="product-card">
        <span class="category-label">${p.categoria}</span>
        <img src="${p.imagen}" class="img-fluid mb-2 rounded" alt="${p.nombre}">
        <h5>${p.nombre}</h5>
        <p>Precio: $${p.precio.toLocaleString()}</p>
        <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      </div>
    `;
    productList.appendChild(col);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  cartItems.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    total += item.precio;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      ${item.nombre} - $${item.precio.toLocaleString()}
      <button class="btn btn-sm btn-danger float-end" onclick="eliminarDelCarrito(${index})">X</button>
    `;
    cartItems.appendChild(div);
  });
  totalElement.innerText = "Total: $" + total.toLocaleString();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

document.getElementById('checkout').addEventListener('click', () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  alert(`Redirigiendo a WebPay... Monto: $${total.toLocaleString()}`);
  // Redirección simulada: en una implementación real aquí conectas con un backend
});

mostrarProductos();
