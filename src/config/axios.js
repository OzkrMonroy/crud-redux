import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: 'https://my-json-server.typicode.com/OzkrMonroy/productos'
})

// Para desarrollo local
// const clienteAxios = axios.create({
//   baseURL: 'http://localhost:4000'
// })

export default clienteAxios