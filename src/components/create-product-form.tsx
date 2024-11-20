
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


export function CreateProductForm() {

  const [name, setName] = useState('')
  const [qntd, setQntd] = useState(0)
  const [preco, setPreco] = useState('')


  async function cadastrarProduto() {
    // console.log('chamou cadastrar um usuario')

    const data = {
      name,
      qntd,
      preco
    }

    const res = await axios.post('http://localhost:3333/products', data)

    console.log(res.data)

    setName('')
    setQntd(0)
    setPreco('')
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="mx-auto w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastar novo produto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nome" className="self-start">Nome</Label>
              <Input
                id="nome"
                type="nome"
                placeholder="Digite o nome do produto"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="qntd" className="self-start">Quantidade</Label>
              <Input
                id="qntd"
                type="number"
                placeholder="0"
                required
                min={1}
                value={qntd}
                onChange={e => setQntd(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="preco" className="self-start">Preço</Label>
              <Input
                id="preco"
                type="preco"
                placeholder="R$ 0,00"
                required
                value={preco}
                onChange={e => setPreco(e.target.value)}
              />
            </div>
            <Button type="button" className="w-full" onClick={cadastrarProduto}>
              Cadastrar
            </Button>
          </div>
          <div className="mt-4 text-sm text-center">
            Já realizou o cadastro?
            <Link className="ml-4 underline" to='/listarProdutos'>
              Veja a lista atualizada
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
