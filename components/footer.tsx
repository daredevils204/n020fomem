import Link from 'next/link'
import React from 'react'
import { SiDiscord, SiGithub, SiX } from 'react-icons/si'
import { Button } from './ui/button'

const Footer: React.FC = () => {
  return (
    <footer className="w-fit p-1 md:p-2 fixed bottom-0 right-0 hidden lg:block">
      <div className="flex justify-end">
        <p className="text-gray-500 dark:text-gray-400">© Copyright 2025 by Nexa LAC</p>
      </div>
    </footer>
  )
}

export default Footer
