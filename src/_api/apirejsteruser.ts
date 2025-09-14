
import{formSchemaType}from'../types/interfaceschema'
export async function registerUser(data: formSchemaType) {

const res=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

return res.json()

}