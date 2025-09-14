'use client';

import { getdatacard } from '@/_api/card';
import {useSession } from 'next-auth/react'
import React, { createContext, useState, ReactNode, useEffect } from 'react';

type AppContextType = {
  count: number;
  setcount: React.Dispatch<React.SetStateAction<number>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [count, setcount] = useState(0);


  const { status } = useSession()



async function getdatacart() {

const data = await getdatacard()


const sum = data?.products?.reduce((total: number, item: { count: number }) => total += item.count, 0);
setcount(sum);

    
}


useEffect(() => {
  if (status === 'authenticated') {
    getdatacart();
  }
}, [status]);





  return (
    <AppContext.Provider value={{ count, setcount }}>
      {children}
    </AppContext.Provider>
  );
}
