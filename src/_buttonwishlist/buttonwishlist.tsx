'use client';

import { useState } from 'react';
import { addwishlist, DELETEwishlist } from '@/_api/Wishlist';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast'

export default function Wishlist({ productIdd }: { productIdd: string }) {
  const [isLiked, setIsLiked] = useState(false); 

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await DELETEwishlist(productIdd);
        setIsLiked(false);
                toast.success('Product removed from wishlist successfully')
        
      } else {
        await addwishlist(productIdd);
        setIsLiked(true);
                toast.success('Product add from wishlist successfully')
        
      }
    } catch (error) {
      console.error('خطأ أثناء تعديل المفضلة:', error);
    }
  };

  return (
    <Button onClick={toggleLike} className="text-3xl p-2">
      <i
        className={`fas fa-heart transition-colors duration-300 ${
          isLiked ? 'text-green-600' : 'text-black'
        }`}
      ></i>
    </Button>
  );
}
