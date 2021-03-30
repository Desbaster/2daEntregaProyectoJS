//Evento de escucha para el boton de ingresar datos del usuario
document.getElementById('formulario').addEventListener('submit', almacenarDatos);

//funcion para almacenar los datos de las inputs ingresadas por el usuario
function almacenarDatos(e) {
  let nombre = document.getElementById('nombre').value;
  let tipo = document.getElementById('tipo').value;
  let monto = document.getElementById('monto').value;
  let mes = document.getElementById('mes').value;

  console.log(tipo)
  //objeto para listar los datos
  let dato = {
    nombre,
    tipo,
    monto,
    mes
  };
  
  //grabar en localStorage 
  if(localStorage.getItem('datos') === null) {
    let datos = [];
    datos.push(dato);
    localStorage.setItem('datos', JSON.stringify(datos));
  } else {
    let datos = JSON.parse(localStorage.getItem('datos'));
    datos.push(dato);
    localStorage.setItem('datos', JSON.stringify(datos));
  }
  

  IngresarDatos();
  //resetear el formulario
  document.getElementById('formulario').reset();
  e.preventDefault();
}

//funcion para eliminar una fila a traves del nombre
function eliminar(nombre) {
  console.log(nombre)
  let datos = JSON.parse(localStorage.getItem('datos'));
  for(let i = 0; i < datos.length; i++) {
    if(datos[i].nombre == nombre) {
      datos.splice(i, 1);
    }
  }
  
  localStorage.setItem('datos', JSON.stringify(datos));
  IngresarDatos();
}

//funcion para ingresar los datos en el HTML (tabla)
function IngresarDatos() {
  let datos = JSON.parse(localStorage.getItem('datos'));
  let datosView = document.getElementById('datos');
  datosView.innerHTML = '';
  for(let i = 0; i < datos.length; i++) {
    let nombre = datos[i].nombre;
    let tipo = datos[i].tipo;
    let monto = datos[i].monto;
    let mes = datos[i].mes;
    
    datosView.innerHTML += 
      `<tbody>
            <tr>
                <th scope="col">${i+1}</th>
                <th scope="col">${nombre}</th>
                <th scope="col">${tipo}</th>
                <th scope="col">${monto}</th>
                <th scope="col">${mes}</th>
                <th scope="col">
                    <a href="#" onclick="eliminar('${nombre}')" class="btn btn-success ml-5">Eliminar</a>
                </th>
            </tr>
        </tbody>`;
  }
  
}

IngresarDatos();




