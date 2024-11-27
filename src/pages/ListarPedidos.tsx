import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderDTO } from "@/DTOs/OrderDTO"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function ListarPedidos() {

  const [ordersData, setOrdersData] = useState<OrderDTO[]>([])

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const res = await axios.get('http://localhost:3333/orders')

    console.log(res.data)

    const { orders } = res.data
    setOrdersData(orders)
  }

  async function inativateOrder(id: number) {
    const res = await axios.put(`http://localhost:3333/orders/${id}`)

    if (res)
      getData()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Card className="p-4">
        <Table>
          <TableCaption>Listagem de pedidos feitos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">VENDEDOR</TableHead>
              <TableHead>PRODUTO</TableHead>
              <TableHead>QUANTIDADE</TableHead>
              <TableHead>PREÇO</TableHead>
              <TableHead>INATIVAR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              ordersData.map(order => (<TableRow key={order.id}>
                <TableCell className="font-medium">{order.user?.name}</TableCell>
                <TableCell>{order.produto.name}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>
                  <Button
                    className="px-4 py-2 text-white rounded-md"
                    variant='destructive'
                    onClick={() => inativateOrder(order.id)}
                  >Inativar</Button>
                </TableCell>
              </TableRow>)
              )
            }

          </TableBody>
        </Table>
      </Card>

      <Card className="relative flex w-3/5 p-8 mt-16">
        <CardTitle>Clique aqui para realizar uma venda</CardTitle>
        <Button className="absolute top-6 right-6">
          <Link to='/cadOrder'>
            Nova venda
          </Link>
        </Button>
      </Card>

      <Card className="relative flex w-3/5 p-8 mt-8">
        <CardTitle>Voltar a primeira página</CardTitle>
        <Button className="absolute top-6 right-6">
          <Link to='/'>
            Voltar
          </Link>
        </Button>
      </Card>
    </div>
  )
}
