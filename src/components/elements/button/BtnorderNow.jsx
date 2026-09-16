import React from 'react'
import { Link } from 'react-router-dom'

export const BtnorderNow = ({ url }) => {
  return (
    <Link to={url} className='absolute right-14 bottom-10 bg-transparent py-2 px-10 rounded-full border-2 border-secondary text-secondary transition-all hover:bg-secondary hover:text-cerah'>
      <h2 className='text-base font-utama font-medium '>Order Now</h2>
    </Link>
  )
}
