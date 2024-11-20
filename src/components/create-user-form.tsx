
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import axios from "axios"

import { useState } from "react"

import { Link } from "react-router-dom"


export function CreateUserForm() {

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')


  async function cadastrarUsuario() {
    console.log('chamou cadastrar um usuario')

    const data = {
      name: nome,
      cnpj,
      email,
      password: senha
    }

    const res = await axios.post('http://localhost:3333/users', data)

    console.log(res.data)

    setNome('')
    setCnpj('')
    setEmail('')
    setSenha('')
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="mx-auto w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Crie sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nome" className="self-start">Nome</Label>
              <Input
                id="nome"
                type="nome"
                placeholder="Digite seu nome"
                required
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cnpj" className="self-start">CNPJ</Label>
              <Input
                id="cnpj"
                type="cnpj"
                placeholder="00.000.000/0000-00"
                required
                value={cnpj}
                onChange={e => setCnpj(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="self-start">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required value={senha}
                onChange={e => setSenha(e.target.value)} />
            </div>
            <Button type="button" className="w-full" onClick={cadastrarUsuario}>
              Cadastrar
            </Button>
          </div>
          <div className="mt-4 text-sm text-center">
            Já criou uma conta?
            <Link className="ml-4 underline" to='/'>
              Veja a lista
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
