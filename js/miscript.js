let cuadros = [
  {
    id: 1,
    nombre: "Room",
    categoria: "Lonely",
    precio: 10,
    img: "./imagenes/gamadenoche.png",
  },
  {
    id: 2,
    nombre: "Train",
    categoria: "Lonely",
    precio: 20,
    img: "./imagenes/gamadenoche2.png",
  },
  {
    id: 3,
    nombre: "Video",
    categoria: "Distraction",
    precio: 35,
    img: "./imagenes/gamadenoche3.png",
  },
  {
    id: 4,
    nombre: "Sidewalk",
    categoria: "Distraction",
    precio: 15,
    img: "./imagenes/gamadenoche4.png",
  },
  {
    id: 5,
    nombre: "False Bowie",
    categoria: "People",
    precio: 50,
    img: "./imagenes/copia.jpg",
  },
  {
    id: 6,
    nombre: "G2",
    categoria: "People",
    precio: 65,
    img: "./imagenes/symbioticself.jpg",
  },
  {
    id: 7,
    nombre: "Pops",
    categoria: "Inside",
    precio: 80,
    img: "./imagenes/carrousel2-min.jpg",
  },
  {
    id: 8,
    nombre: "Again",
    categoria: "Inside",
    precio: 40,
    img: "./imagenes/mg-min.jpg",
  },
];

// Carrito debe estar vacio inicialmente
let carrito = [];
//  creamos la variable carritoJson que es la que va a llevar las cosas al local storage
let carritoJSON = "";
// Con esto capturo el div del html donde se van a renderizar las tarjetas
// fijate que lo capturo por el id, se puede capturar tambien por class o el nombre de la etiqueta
let contenedor = document.getElementById("contenedor");
// Aca se va a renderizar el carrito
let carritoRender = document.getElementById("cart-row");
// Capturamos el modal
let modal = document.getElementById("myModal");
let cartNav = document.getElementById("cart-nav");
//Captura del icono del carrito del nav
let botonCarrito = document.getElementById("cart-button");
// Para mostrar el carrito vacio si no hubiera productos
let total = document.getElementById("total");
// con esto vamos a hacer que el modal cambie de estilo y se vea
botonCarrito.addEventListener("click", mostrar);

let contenedorCarritoTotal = document.getElementById("contenedorCarritoTotal");
let totalFinal = "";
let unidades = "";

// Acá llamo a la función que esta mas abajo
renderizar(cuadros);
// esto es una comprobacion de si existe algo en el storage lo renderice de una manera si no de otra
comprobar(carrito);

function comprobar() {
  if (localStorage.getItem("Carrito")) {
    carrito = JSON.parse(localStorage.getItem("Carrito"));
    renderizarCarro(carrito);
    totalRender(carrito);
  } else {
    totalRenderVacio(carrito);
  }
}


// funcion para filtrar
// para filtrar se puede hacer desde botones como vasmos a hacer o desde algun imput, el imput busca a partir de lo que escribas en el, pero creo que meter un input en el Nav romperia la estetica de la pagina
// Voy a cambiar el nombre de algunos botones del nav y es voy a poner el nombre de las categorias, tambien un id con dicho nombre para capturarlos

let lonely = document.getElementById("Lonely")
let distraction = document.getElementById("Distraction")
let people = document.getElementById("People")
let inside = document.getElementById("Inside")
// tambien voy a capturar el boton index y el logo para que apretando ahi se vuelvan a renderizar todos los cuadros
let inicio = document.getElementById("Inicio")
let logo = document.getElementById("Logo")

inicio.addEventListener("click", renderizarTodo)
logo.addEventListener("click", renderizarTodo)
// llamamos al evento

lonely.addEventListener("click", filtro)
distraction.addEventListener("click", filtro)
people.addEventListener("click", filtro)
inside.addEventListener("click", filtro)

function filtro(e) {
  // e.preventDefault() es algo que me enseño el profe para evitar ciertos problemas, por ejemplo con formularios. capaz no es necesario ponerlo pero por si acaso se lo mando
  e.preventDefault()
  console.log(e.target.id)
  let categoriaFiltrado = cuadros.filter(cuadro => cuadro.categoria == e.target.id)
  renderizar(categoriaFiltrado)
}

function renderizarTodo(e) {
  e.preventDefault()
  renderizar(cuadros)
}


function renderizar(array) {
  // primero se pone el nombre con que capturaste el div con .innerHTML y vac{io para que arranque vacío
  contenedor.innerHTML = "";
  for (const cuadro of array) {
    // Dentro del contenedor puedo crear o no elementos
    // En este caso cree otro div que va a contener a las tarjetas lo llame tarjetabody
    let tarjetaBody = document.createElement("div");
    // aca le cree una clase, puede ser una de bootstrap como le puse o alguna que quieras darle para modificarla en css
    tarjetaBody.className = "tarjeta-body";
    // aca se utiliza el templatestring para que en cada vuelta de bucle renderice esta tarjeta de bootstrap
    tarjetaBody.innerHTML = `
          <div class="card">
              <div class="card-img">
                  <img src="${cuadro.img}" alt="Card image cap">
              </div>
              <h5 class="card-title">${cuadro.nombre}</h5>
              <p class="card-text">
              The value of the illustrations is expressed in US dollars.</p>
              <div class="cardBody">
                  <h6 class= "precio"><strong>Precio: $ ${cuadro.precio.toFixed(
      2
    )}</strong></h6>
                  <button id="${cuadro.id
      }"  class="btn btn-secondary me-md-2">Buy</button>
              </div>
          </div>
          `;
    // por ultimo el div creado (tarjetabody) se apendea a el contenedor capturado en el html
    contenedor.append(tarjetaBody);
  }
  // Esto fuera del bucle for
  // aca capturo el boton de las tarjetas que trae el id mediante su clase
  let comprar = document.getElementsByClassName("btn btn-secondary me-md-2");
  // aca tenemos que hacer un ciclo por que cada tarjeta tiene un boton comprar
  for (boton of comprar) {
    boton.addEventListener("click", addCarrito);
  }
}

function renderizarCarro(array) {
  carritoRender.innerHTML = "";
  for (let cuadro of array) {
    let cart = document.createElement("div");
    cart.className = "cart-render";
    cart.innerHTML = `
          <div class="cart-row">
              <div  style="flex:1"><img class="row-image" src="${cuadro.img
      }"></div>
              <div  style="flex:2"><p class="cart-p">${cuadro.nombre}</p></div>
              <div  style="flex:1"><p class="cart-p">$${cuadro.precio.toFixed(
        2
      )}</p></div>
              <div style="flex:1">
                  <p class="quantity">${cuadro.unidades}</p>
                  <div class="quantity">
                  <img id="${cuadro.id
      }" class="chg-quantity update-cart " src="./imagenes/arrow-up.png">
                  <img id="${cuadro.id
      }" class="chg-quantity-2 update-cart" src="./imagenes/arrow-down.png">
                  </div>
              </div>
              <div style="flex:1"><p class="cart-p">$${cuadro.subtotal.toFixed(
        2
      )}</p></div>
          </div>
          `;
    carritoRender.append(cart);
  }
  // Aca capture los botones que son dos flechas una para sumar y otra restar productos del carro
  let add = document.getElementsByClassName("chg-quantity update-cart");
  for (let a of add) {
    a.addEventListener("click", addCarrito);
  }
  let remove = document.getElementsByClassName("chg-quantity-2 update-cart");
  for (let b of remove) {
    b.addEventListener("click", removeItem);
  }
}

function addCarrito(e) {
  // console.log(e.target.id)
  // primero vamos a usar lo que pasa el boton comprar que trae un id (e), con ese id vamos a buscar en el array cuadros
  let productoBuscado = cuadros.find((cuadro) => cuadro.id == e.target.id);
  // verificamos que no se encuentre en carrito
  // finIndex(), si encuentra el elemento devuelve su posicion, si no devuelve -1, por eso aparece esa sentencia en el if
  let indexCuadro = carrito.findIndex(
    (cuadro) => cuadro.id == productoBuscado.id
  );
  //  El -1 es lo que retorna findIndex si no encontro el elemento buscado en carrito
  if (indexCuadro != -1) {
    // si existe en el carrito el producto hara esto
    // primero si esta el producto sumara una unidad al producto
    carrito[indexCuadro].unidades++;
    // esto es segundo se utiliza para ir sumando los precios a medida que uno compra un producto
    carrito[indexCuadro].subtotal =
      carrito[indexCuadro].precio * carrito[indexCuadro].unidades;
    // lo siguiente es llevarlo al local storage
    // convertimos lo que este en carrito en formato JSON para llevarlo al local Storage
    carritoJSON = JSON.stringify(carrito);
    // Guardamos en el localStorage a carritoJSON ya parseado
    localStorage.setItem("Carrito", carritoJSON);
  } else {
    // En el caso de que el elemento no se encuentre en carrito, pusheamos el objeto con las clave valor que querramos,
    // en el array original(cuadros) no existe unidades ni subtotal
    carrito.push({
      id: productoBuscado.id,
      nombre: productoBuscado.nombre,
      categoria: productoBuscado.categoria,
      precio: productoBuscado.precio,
      img: productoBuscado.img,
      unidades: 1,
      subtotal: productoBuscado.precio,
    });
    // convertimos el carrito a Json y lo agregamos al localStorage (ojo Carrito con mayuscula no es el array carrito, es el nombre que va allevaar en el local storage)
    carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("Carrito", carritoJSON);
  }
  renderizarCarro(carrito);
  totalRender(carrito);
}

function removeItem(e) {
  // igual que en la funcion addCarrito
  let productoBuscado = cuadros.find((cuadro) => cuadro.id == e.target.id);
  let indexCuadro = carrito.findIndex(
    (cuadro) => cuadro.id == productoBuscado.id
  );

  if (indexCuadro != -1) {
    // aca verificamos que si el carrito tiene un producto con cantidad mayor a dos puede restar
    if (carrito[indexCuadro].unidades >= 2) {
      carrito[indexCuadro].unidades--;
      carrito[indexCuadro].subtotal =
        carrito[indexCuadro].subtotal - carrito[indexCuadro].precio;
      carritoJSON = JSON.stringify(carrito);
      localStorage.setItem("Carrito", carritoJSON);
    } else {
      // aca si el carrito tiene una unidad y la resta (da cero) directamente elimine el producto
      carrito.splice(indexCuadro, 1);
      carritoJSON = JSON.stringify(carrito);
      localStorage.setItem("Carrito", carritoJSON);
    }
  }
  // esto es para que de el total de unidades de todos los productos en el carro y la suma de todos los precios
  totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0);
  unidades = carrito.reduce((a, b) => a + b.unidades, 0);
  renderizarCarro(carrito);
  totalRender(carrito);
}

function totalRender(array) {
  // Esto es un metodo medio raro de js para sacar la suma de cosas en un array en este caso los subtotales, ylas unidades
  totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0);
  unidades = carrito.reduce((a, b) => a + b.unidades, 0);
  total.innerHTML = "";
  let totalResumen = document.createElement("div");
  totalResumen.className = "total";
  totalResumen.innerHTML = `
      <span class="close">&times;</span> 
      <h5 class="totalh5" >Items: <strong>${unidades}</strong></h5>
      <h5 class="totalh5" >Total:<strong> $ ${totalFinal.toFixed(
    2
  )}</strong></h5>
      <button id="clear" style="float:right; margin:5px;" type="button" class="btn btn-outline-success">Pay now</button>
      `;
  total.append(totalResumen);
  // esto es la x de cierre del modal
  let span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };
  // Esta parte es el numerito que se renderiza al lado del carro en el nav
  cartNav.innerHTML = "";
  if (array.lenght != 0) {
    let parrafo = document.createElement("div");
    parrafo.className = "cart-total";
    parrafo.innerHTML = `<p>${unidades}</p>`;
    cartNav.append(parrafo);
  } else {
    let parrafo = document.createElement("div");
    parrafo.className = "cart-total";
    parrafo.innerHTML = `<p>0</p>`;
    cartNav.append(parrafo);
  }
  // y esto es el boton pagar o comprar llama a borrar el storage
  let clear = document.getElementById("clear");
  clear.addEventListener("click", borrarStorage);
}
// esta funcion es solo por si no hay nada en el storage ponga por defecto el carrito con los datos vacios
function totalRenderVacio(array) {
  total.innerHTML = "";
  let totalResumen = document.createElement("div");
  totalResumen.className = "total";
  totalResumen.innerHTML = `
          <span class="close">&times;</span> 
          <h5 class="totalh5">Items: <strong> 0 </strong></h5>
          <h5 class="totalh5">Total:<strong> $ 0.00 </strong></h5>
          `;
  total.append(totalResumen);
  cartNav.innerHTML = "";
  let parrafo = document.createElement("div");
  parrafo.className = "cart-total";
  parrafo.innerHTML = `<p>0</p>`;
  cartNav.append(parrafo);

  let span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };
}

function mostrar(e) {
  // cambiamos el display del css de NONE a BLOK para que se vea
  modal.style.display = "block";
}
// esto siguiente es un a manera de cerrar el modal clickeando fuera de el
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// Borrar storage
function borrarStorage() {
  localStorage.removeItem("Carrito");
  contenedorCarritoTotal.className = "modal-content";
  modal.style.display = "none";

  carrito = [];
  totalRenderVacio(carrito);
  renderizarCarro(carrito);
  renderizar(cuadros);
  comprobar(carrito);
}


