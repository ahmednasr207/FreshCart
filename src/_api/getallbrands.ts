
import{Brandint}from '../types/interfaceproducts'

export async function getAllbrands() {

    try{
const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')

const {data} = await response.json()

        return data
    } catch (error) {
        alert('Error fetching brands:'+ error)
    }


}




export async function getbrands(brandId: string) {

    try{
const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)

const {data} = await response.json()

        return data
    } catch (error) {
        alert('Error fetching brands:'+ error)
    }


}


