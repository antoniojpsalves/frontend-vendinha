import { AtualizarProduto } from "@/pages/AtualizarProduto";
import { AtualizarUsario } from "@/pages/AtualizarUsuario";
import { CadastrarProduto } from "@/pages/CadastrarProduto";
import { Cadastrar } from "@/pages/Cadastro";
import { ListarProdutos } from "@/pages/ListarProdutos";
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
  },
  {
    path: '/listarProdutos',
    element: <ListarProdutos />
  },
  {
    path: '/cadProduct',
    element: <CadastrarProduto />
  },
  {
    path: '/editarProduct/:id',
    element: <AtualizarProduto />
  },
])
