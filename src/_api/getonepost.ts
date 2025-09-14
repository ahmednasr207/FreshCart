import { ProductResponse } from '../types/interfaceproducts';

export async function getonepost(productId: string): Promise<ProductResponse> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json(); 
}
