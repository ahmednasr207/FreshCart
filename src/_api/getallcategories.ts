

import{Category}from'../types/interfaceproducts'

export async function getAllCategories(): Promise<Category[]> {

const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')

const {data} = await response.json()

return data


}

export async function getCategoriesById(id:string) {

const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)

const {data} = await response.json()

return data


}



