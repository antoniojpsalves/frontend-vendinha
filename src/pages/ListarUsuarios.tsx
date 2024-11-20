import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserDTO } from "@/DTOs/UserDTO"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



export function ListarUsuarios() {


  const [usersData, setUsersData] = useState<UserDTO[]>([])

  useEffect(() => {
    getData()
  }, [])


  async function getData() {
    const res = await axios.get('http://localhost:3333/users')
    const { users } = res.data
    setUsersData(users)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Card className="p-4">
        <Table>
          <TableCaption>Listagem de usuários cadastrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">NOME</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead className="text-right">STATUS</TableHead>
              <TableHead>OPÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              usersData.map(user => (<TableRow>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.cnpj}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.isActive ? 'Ativo' : 'Inativo'}</TableCell>
                <TableCell>
                  <Link
                    className="px-4 py-2 text-white rounded-md bg-violet-800 bourder hover:bg-violet-600"
                    to={`/editarUsuario/${user.id}`}
                  >Editar</Link>
                </TableCell>
              </TableRow>)
              )
            }

          </TableBody>
        </Table>
      </Card>

      <Card className="relative flex w-3/5 p-8 mt-16">
        <CardTitle>Que tal adicionar um novo usuário?</CardTitle>
        <Button className="absolute top-6 right-6">
          <Link to='/cadUser'>
            Criar usuário
          </Link>
        </Button>
      </Card>
    </div>
  )
}
