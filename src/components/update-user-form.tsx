/* eslint-disable react-hooks/exhaustive-deps */

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

import { useEffect, useState } from "react"

// import { Link } from "react-router-dom"
import { Switch } from "./ui/switch"
import { useNavigate, useParams } from "react-router-dom"


export function UpdateUserForm() {

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [status, setStatus] = useState<boolean>()


  async function updateUsuario() {
    // console.log('chamou atualizar um usuario')

    if (senha.length === 0) {
      return alert('Informe uma senha válida')
    }

    const data = {
      name: nome,
      cnpj,
      email,
      password: senha,
      isActive: status
    }

    await axios.put(`http://localhost:3333/users/${id}`, data)

    // console.log(res.data)


    setNome('')
    setCnpj('')
    setEmail('')
    setSenha('')
    setStatus(true)

    navigate("/listarUsuarios")

  }

  async function getUserData() {
    // console.log('buscando informações')

    const res = await axios.get(`http://localhost:3333/users/${id}`)

    // console.log(res.data)
    const { user } = res.data

    // console.log(user)

    setNome(user.name)
    setCnpj(user.cnpj)
    setEmail(user.email)
    setSenha('')
    setStatus(user.isActive)

  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="mx-auto w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Atualizar usuário</CardTitle>
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
                <Label htmlFor="password">Nova Senha</Label>
              </div>
              <Input id="password" type="password" required value={senha}
                onChange={e => setSenha(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="status" className="self-start">Inativo / Ativo</Label>
              <Switch checked={status} onCheckedChange={setStatus} />
            </div>
            <Button type="button" className="w-full" onClick={updateUsuario}>
              Atualizar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
