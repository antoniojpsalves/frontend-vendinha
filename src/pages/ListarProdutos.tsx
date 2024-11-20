import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductDTO } from "@/DTOs/ProductDTO"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



export function ListarProdutos() {

  const [productsData, setProductsData] = useState<ProductDTO[]>([])

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const res = await axios.get('http://localhost:3333/products')
    const { products } = res.data
    setProductsData(products)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Card className="p-4">
        <Table>
          <TableCaption>Listagem de produtos cadastrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">NOME</TableHead>
              <TableHead>QUANTIDADE</TableHead>
              <TableHead>PREÇO</TableHead>
              <TableHead>OPÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              productsData.map(product => (<TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.qntd}</TableCell>
                <TableCell>{product.preco}</TableCell>
                <TableCell>
                  <Link
                    className="px-4 py-2 text-white rounded-md bg-violet-800 bourder hover:bg-violet-600"
                    to={`/editarProduct/${product.id}`}
                  >Editar</Link>
                </TableCell>
              </TableRow>)
              )
            }

          </TableBody>
        </Table>
      </Card>

      <Card className="relative flex w-3/5 p-8 mt-16">
        <CardTitle>Clique aqui para adicionar um produto ao estoque</CardTitle>
        <Button className="absolute top-6 right-6">
          <Link to='/cadProduct'>
            Novo produto
          </Link>
        </Button>
      </Card>

      <Card className="relative flex w-3/5 p-8 mt-8">
        <CardTitle>Voltar a lista de usuários</CardTitle>
        <Button className="absolute top-6 right-6">
          <Link to='/'>
            Voltar
          </Link>
        </Button>
      </Card>
    </div>
  )
}
