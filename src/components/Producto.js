import React from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
// Redux
import { useDispatch } from 'react-redux'
import { eliminarProductoAction } from '../actions/productosActions'

const Producto = ({producto}) => {
  
  const dispatch = useDispatch()
  const eliminarProducto = id => dispatch(eliminarProductoAction(id))

  const confirmarEliminarProducto = id => {
    // Alert Dialog
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Un producto eliminado no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'El producto se eliminó correctamente.',
          'success'
        )
        eliminarProducto(id)
      }
    })
  }

  return ( 
    <tr>
      <td>{producto.nombre}</td>
      <td><span className="font-weight-bold">$ </span>{producto.precio}</td>
      <td className="acciones">
        <Link to={`/productos/editar/${producto.id}`} className="btn btn-primary mr-2">Editar</Link>
        <button className="alert alert-danger"
          onClick={() => confirmarEliminarProducto(producto.id)}>Eliminar</button>
      </td>
    </tr>
   );
}
 
export default Producto;