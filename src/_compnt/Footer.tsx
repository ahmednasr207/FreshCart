import React from 'react';

export default function FooterPage() {
  return (
    <footer className="bg-black text-white text-center py-6 w-full">
      <p className="text-lg">This website is built for showcasing products and shopping experience.</p>
      <p className="text-sm mt-2  text-white">&copy;{new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
