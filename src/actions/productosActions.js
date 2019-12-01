import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_EXITO, AGREGAR_PRODUCTO_ERROR, 
  COMENZAR_DESCARGA_PRODUCTOS, DESCARGA_PRODUCTOS_EXITOSA, DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR, ELIMINAR_PRODUCTO_EXITO, ELIMINAR_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_EDITAR, EDITAR_PRODUCTO_EXITO, EDITAR_PRODUCTO_ERROR,
  COMENZAR_EDICION_PRODUCTO, PRODUCTO_EDITADO_EXITO, PRODUCTO_EDITADO_ERROR } from '../types'
import clienteAxios from '../config/axios'

export function crearNuevoProductoAction(producto) {
  return (dispatch) => {
    dispatch( nuevoProducto() )
    // Insertar libro
    clienteAxios.post('/libros', producto).then(respuesta => {
      // Para ejecutar la funcion necesitamos utilizar dispatch
      dispatch(agregarProductoExito(producto))
    })
    .catch(error => {
      console.log(error);
      dispatch(agregarProductoError(true))
    })
  }
}

export const nuevoProducto = () => ({
  type: AGREGAR_PRODUCTO
})

export const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
})

export const agregarProductoError = error => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: error
})

// Obtener los datos de la API
export function obtenerProductosAction() {
  return dispatch => {
    dispatch( obtenerProductos() )
    // Consultar Api
    clienteAxios.get('/libros')
                .then(respuesta => {
                  dispatch(descargaProductosExitosa(respuesta.data))
                })
                .catch(error => {
                  dispatch(descargaProductosError())
                })
  }
}

export const obtenerProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITOSA,
  payload: productos
})

export const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR
})

// Eliminar un producto de la api y del state
export function eliminarProductoAction(id) {
  return dispatch => {
    dispatch( obtenerProductoEliminar() )
    // Eliminar de la api
    clienteAxios.delete(`/libros/${id}`)
                .then(res => {
                  dispatch( eliminarProductoExito(id) )
                })
                .catch(error => {
                  dispatch( eliminarProductoError() )
                })
  }
}

export const obtenerProductoEliminar = () => ({
  type: OBTENER_PRODUCTO_ELIMINAR
})

export const eliminarProductoExito = id => ({
  type: ELIMINAR_PRODUCTO_EXITO,
  payload: id
})

export const eliminarProductoError = () => ({
  type: ELIMINAR_PRODUCTO_ERROR
})

// Obtener producto a editar
export function obtenerProductoEditarAction(id) {
  return dispatch => {
    dispatch( obtenerProductoEditar() )
    // Obtenemos el producto a editar
    clienteAxios.get(`/libros/${id}`)
                .then( res => {
                  console.log(res.data)
                  dispatch( obtenerEditarProductoExito(res.data) )
                })
                .catch(error => {
                  dispatch( obtenerEditarProductoError() )
                })
  }
}

export const obtenerProductoEditar = () => ({
  type: OBTENER_PRODUCTO_EDITAR
})

export const obtenerEditarProductoExito = producto => ({
  type: EDITAR_PRODUCTO_EXITO,
  payload: producto
})

export const obtenerEditarProductoError = () => ({
  type: EDITAR_PRODUCTO_ERROR
})

// Modificar un producto en la api y en el state
export function editarProductoAction(producto) {
  return dispatch => {
    dispatch( comenzarEditarProducto() )
    // Enviar peticion a la api
    clienteAxios.put(`/libros/${producto.id}`, producto)
                .then(res => {
                  dispatch( editarProductoExito(res.data) )
                })
                .catch(error => {
                  console.log(error)
                  dispatch( editarProductoError() )
                })
  }
}

export const comenzarEditarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
})

export const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})

export const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR
})
