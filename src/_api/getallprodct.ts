
import{InterfaceProducts}from'../types/interfaceproducts'

export async function getAllProducts(): Promise<InterfaceProducts[]> {

const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')

const {data} = await response.json()

return data


}








