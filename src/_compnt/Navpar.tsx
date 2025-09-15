'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { AppContext } from '../types/context';

export default function Navbar() {
  const { data, status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { count } = useContext(AppContext)!;


  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/Products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Brands', href: '/brands' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const linkStyle = (isActive: boolean) =>
    `px-3 py-2 rounded-md transition font-medium text-sm md:text-base 
     ${isActive ? 'text-blue-600 font-bold' : 'text-black hover:text-gray-600'}`;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: '/auth/signin' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
\      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/freshcart-logo.svg"
            alt="Logo"
            width={160}
            height={40}
            className="w-32 md:w-40 lg:w-44 h-auto"
          />
        </Link>

        <div className="hidden lg:flex flex-1 justify-center items-center">
          <ul className="flex items-center gap-2">
            {navLinks.map((item) => {
              const isActive = isLinkActive(item.href);
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className={linkStyle(isActive)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {status === 'authenticated' && (
            <>
              <Link 
                href="/Wishlist" 
                className={linkStyle(isLinkActive('/Wishlist'))}
              >
                Wishlist
              </Link>
              <Link 
                href="/allorders" 
                className={linkStyle(isLinkActive('/allorders'))}
              >
                Orders
              </Link>
              <Link
  href="/cart"
  className={`flex items-center gap-1 px-3 py-2 transition-colors ${linkStyle(isLinkActive('/cart'))}`}
>
  <div className="relative">
    <ShoppingCartIcon className="w-5 h-5" />
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
        {count > 99 ? '99+' : count}
      </span>
    )}
  </div>
  <span>Cart</span>
</Link>
            </>
          )}

          {status === 'unauthenticated' && (
            <>
              <Link 
                href="/auth/signin" 
                className={linkStyle(isLinkActive('/auth/signin'))}
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className={linkStyle(isLinkActive('/auth/signup'))}
              >
                Sign Up
              </Link>
            </>
          )}

          {status === 'authenticated' && (
            <>
              <Link
                href="/profil"
                className={`${linkStyle(isLinkActive('/profil'))} font-semibold`}
              >
                👋 {data?.user?.name?.split(' ')[0] || 'User'}
              </Link>
              <button 
                onClick={handleLogout} 
                className={`${linkStyle(false)} ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-black hover:text-gray-600 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          )}
        </button>
      </div>

      {/* القائمة المنسدلة للجوال */}
      <div
        className={`lg:hidden px-4 pb-4 transition-all duration-300 bg-white border-t border-gray-200 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-3 text-sm">
          {navLinks.map((item) => {
            const isActive = isLinkActive(item.href);
            return (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className={linkStyle(isActive)}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

          {status === 'authenticated' && (
            <>
              <li>
                <Link 
                  href="/Wishlist" 
                  className={linkStyle(isLinkActive('/Wishlist'))}
                  onClick={() => setIsOpen(false)}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link 
                  href="/allorders" 
                  className={linkStyle(isLinkActive('/allorders'))}
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 px-3 py-2 text-black hover:text-gray-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative">
                    <ShoppingCartIcon className="w-5 h-5" />
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {count > 99 ? '99+' : count}
                      </span>
                    )}
                  </div>
                  Cart ({count})
                </Link>
              </li>
            </>
          )}

          {status === 'unauthenticated' && (
            <>
              <li>
                <Link 
                  href="/auth/signin" 
                  className={linkStyle(isLinkActive('/auth/signin'))}
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link 
                  href="/auth/signup" 
                  className={linkStyle(isLinkActive('/auth/signup'))}
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}

          {status === 'authenticated' && (
            <>
              <li>
                <Link
                  href="/profil"
                  className={`${linkStyle(isLinkActive('/profil'))} font-semibold`}
                  onClick={() => setIsOpen(false)}
                >
                  👋 Hello, {data?.user?.name?.split(' ')[0] || 'User'}
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className={`${linkStyle(false)} flex items-center gap-2 w-full text-left ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging out...
                    </>
                  ) : (
                    'Log Out'
                  )}
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}