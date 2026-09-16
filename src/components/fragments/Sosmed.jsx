import React from 'react'
import { IconMeta } from '../elements/icon/IconMeta'
import { IconInstagram } from '../elements/icon/IconInstagram'
import { IconGithub } from '../elements/icon/IconGithub'

export const Sosmed = () => {
  return (
    <div className='flex justify-center items-center space-x-7'>
      <IconMeta
        warna={`#609966`}
        url='https://github.com/torikallcode'
      />
      <IconInstagram
        warna={`#609966`}
        url='https://github.com/torikallcode'
      />
      <IconGithub
        warna={`#609966`}
        url='https://github.com/torikallcode'
      />
    </div>
  )
}
