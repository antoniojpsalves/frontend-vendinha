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

import { useNavigate, useParams } from "react-router-dom"


export function UpdateProductForm() {

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const [name, setName] = useState('')
  const [qntd, setQntd] = useState(0)
  const [preco, setPreco] = useState('')


  async function updateProduct() {

    const data = {
      name,
      qntd,
      preco
    }

    await axios.put(`http://localhost:3333/products/${id}`, data)
    setName('')
    setQntd(0)
    setPreco('')

    navigate("/listarProdutos")

  }

  async function getProductData() {
    // console.log('buscando informações')

    const res = await axios.get(`http://localhost:3333/products/${id}`)

    const { product } = res.data

    setName(product.name)
    setQntd(product.qntd)
    setPreco(product.preco)

  }

  useEffect(() => {
    getProductData()
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
                placeholder="Digite o nome atualizado do produto"
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
                min={0}
                required
                value={qntd}
                onChange={e => setQntd(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="preco" className="self-start">Preço</Label>
              <Input
                id="preco"
                type="text"
                placeholder="R$ 0,00"
                required
                value={preco}
                onChange={e => setPreco(e.target.value)}
              />
            </div>
            <Button type="button" className="w-full" onClick={updateProduct}>
              Atualizar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
