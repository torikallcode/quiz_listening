import React from 'react'
import { Navbar } from '../sections/Navbar'
import { BtnorderNow } from '../elements/button/BtnorderNow'
import { Sosmed } from '../fragments/Sosmed'

export const AuthLayout = () => {
  return (
    <div className='w-full'>
      <Navbar />
      <div id='home' className='flex flex-col justify-center items-center h-[100dvh] bg-cerah relative'>
        <h1 className='text-[10rem] font-bebas text-secondary max-w-5xl leading-[8rem] text-center'>Lorem ipsum dolor seone sit amet.</h1>
        <img src="/img/utama1.png" alt="" className='absolute left-0 top-64 mx-auto right-0 w-96' />
        <BtnorderNow />
        <div className='absolute left-14 bottom-10'>
          <Sosmed />
        </div>
      </div>
      <div className='flex justify-around items-center w-full h-[100dvh] bg-cerah relative'>
        <img src="/img/utama1.png" alt="" className='absolute left-0 top-0 mx-auto right-0 w-96' />
      </div>
    </div>
  )
}
