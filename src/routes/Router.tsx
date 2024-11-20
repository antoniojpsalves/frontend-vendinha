import { AtualizarUsario } from "@/pages/AtualizarUsuario";
import { Cadastrar } from "@/pages/Cadastro";
import { ListarUsuarios } from "@/pages/ListarUsuarios";
// import { Login } from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <ListarUsuarios />
  },
  {
    path: '/cadUser',
    element: <Cadastrar />
  },
  {
    path: '/listarUsuarios',
    element: <ListarUsuarios />
  },
  {
    path: '/editarUsuario/:id',
    element: <AtualizarUsario />
  }
])
