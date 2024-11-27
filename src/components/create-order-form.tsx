
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

import { Link, useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { UserDTO } from "@/DTOs/UserDTO"
import { ProductDTO } from "@/DTOs/ProductDTO"


export function CreateOrderForm() {


  const navigate = useNavigate()

  const [vendedores, setVendedores] = useState<UserDTO[]>()
  const [produtos, setProdutos] = useState<ProductDTO[]>()

  const [quantidade, setQuantidade] = useState<number>(0)


  const [selectedVendedor, setSelectedVendedor] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  async function cadastrarPedido() {
    console.log('chamou cadastrar um pedido')

    if (selectedProduct === undefined || selectedVendedor === undefined || quantidade === 0) {
      return
    }

    const data = {
      userId: selectedVendedor,
      productId: selectedProduct,
      quantidade
    }

    await axios.post('http://localhost:3333/orders', data)

    // getSelectOptions()
    // setQuantidade(0)
    return navigate('/listAllOrders')
  }

  async function getSelectOptions() {
    const { users } = await axios.get('http://localhost:3333/users').then(res => res.data)
    const { products } = await axios.get('http://localhost:3333/products').then(res => res.data)

    setVendedores(users)
    setProdutos(products)
  }

  useEffect(() => {
    getSelectOptions()
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="mx-auto w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Faça uma venda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="vendedor" className="self-start">Vendedor</Label>
              <Select onValueChange={(value) => setSelectedVendedor(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha um vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {
                    vendedores?.map(vendedor => (<SelectItem value={String(vendedor.id)}>{vendedor.name}</SelectItem>))
                  }

                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="produto" className="self-start">Produto</Label>
              <Select onValueChange={(value) => setSelectedProduct(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha um produto" />
                </SelectTrigger>
                <SelectContent>
                  {
                    produtos?.map(produto => (<SelectItem value={String(produto.id)}>{produto.name}</SelectItem>))
                  }

                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="quantidade" className="self-start">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                placeholder="0"
                required
                value={quantidade}
                onChange={e => setQuantidade(parseInt(e.target.value))}
              />
            </div>

            <Button type="button" className="w-full" onClick={cadastrarPedido}>
              Cadastrar
            </Button>
          </div>
          <div className="mt-4 text-sm text-center">
            Já fez um pedido?
            <Link className="ml-4 underline" to='/listAllOrders'>
              Veja a lista atualizada
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
