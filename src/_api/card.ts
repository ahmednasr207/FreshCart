'use server'
import {getUserToken} from '../lib/auth-utils'

export async function getdatacard() {
    
const token= await getUserToken();
if(!token){

throw new Error ("token eror")

}

const res=await fetch (`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/cart`,{

headers:{

token:  token

}


} )

const data=await res.json()


return data.data
}



export async function addprodctcart(id:string){

const token=await getUserToken()
if (!token) {
    

throw new Error('r')

}

const res=await fetch (`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/cart`,{

method:'POST',

     headers: {
         token:token,

        'Content-Type': 'application/json'
      },


body:JSON.stringify({

productId:id


})




})

const data=await res.json();

return data


}



export async function addprodctnumbr(id:string ,count:number){

const token=await getUserToken()
if (!token) {
    

throw new Error('r')

}

const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/cart/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    token: token, 
  },
  body: JSON.stringify({
    count: count,
  }),
});



const data=await res.json();

return data


}



export async function removprodctcart(id:string){

const token=await getUserToken()
if (!token) {
    

throw new Error('r')

}

const res=await fetch (`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/cart/${id}`,{

method:'delete',

     headers: {
         token:token,

      },

})

const data=await res.json();

return data


}


export async function removallprodctcart(){

const token=await getUserToken()
if (!token) {
    

throw new Error('r')

}

const res=await fetch (`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/cart`,{

method:'delete',

     headers: {
         token:token,

      },

})

const data=await res.json();

return data


}








