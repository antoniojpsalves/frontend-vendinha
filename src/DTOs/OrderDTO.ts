import { ProductDTO } from "./ProductDTO"
import { UserDTO } from "./UserDTO"

export interface OrderDTO {
  id: number
  price: string
  produto: ProductDTO
  produtoId: number
  quantity: number
  status: string
  userId: number
  user: UserDTO
}
