'use client'
import { DELETEwishlist } from '@/_api/Wishlist'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import React, { useState } from 'react'

export default function WishlistData({ productIdd, getdata }: { 
  productIdd: string; 
  getdata: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false)

  async function removeFromWishlist(productId: string) {
    setIsLoading(true)
    try {
      const data = await DELETEwishlist(productId)
      
      if (data.status === 'success') {
        toast.success('Product removed from wishlist successfully')
        await getdata()
      } else {
        toast.error(data.message || 'Failed to remove product from wishlist')
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      toast.error('An error occurred while removing the product')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button 
        onClick={() => removeFromWishlist(productIdd)}
        className="p-2 text-3xl transition-all duration-300 hover:scale-110"
        variant="ghost"
        disabled={isLoading}
        aria-label="Remove from wishlist"
      >
        {isLoading ? (
          <i className="fas fa-spinner fa-spin text-green-600"></i>
        ) : (
          <i className="fas fa-heart text-green-600"></i>
        )}
      </Button>
    </div>
  )
}