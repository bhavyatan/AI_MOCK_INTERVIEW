"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Header() {
  const router=useRouter();
   const path=usePathname();
   useEffect(()=>{
     console.log(path)
    },[])
  
  return (
    <div className='flex p-4 items-center justify-between bg-white shadow-sm ' >
        
        <Image src={'/logo.svg'} width={90} height={90} alt="logo"  />
        <ul className=' hidden md:flex gap-6' >

        
            <li onClick={()=>router.push('/dashboard/')} className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${ path === '/dashboard' && 'text-purple-500 font-bold'}`}>Dashboard</li>

            {/* <li className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${ path === '/dashboard/questions' && 'text-purple-500 font-bold'}`}>Questions</li> */}
            <li onClick={()=>router.push('/dashboard/upgrade')} className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${ path === '/dashboard/upgrade' && 'text-purple-500 font-bold'}`}>Upgrade</li>
            <li  onClick={()=>router.push('/dashboard/how_it_works')}className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${ path === '/dashboard/how it works?' && 'text-purple-500 font-bold'}`}>How it Works?</li>
            <li onClick={()=>router.push('/dashboard/support')} className={`hover:text-purple-500 hover:font-bold transition-all cursor-pointer ${ path === '/dashboard/support' && 'text-purple-500 font-bold'}`}>Support</li>
        </ul>
        <UserButton />
    </div>
  )
}

export default Header