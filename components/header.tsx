import { cn } from '@/lib/utils'
import React from 'react'
import HistoryContainer from './history-container'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { Chat } from '@/lib/types'

type HistoryItemProps = {
  chat: Chat
}

export const Header: React.FC<HistoryItemProps> = async ({ chat }) => {
  const pathname = usePathname()
  const isActive = pathname === chat.path

  return (
    <header className="fixed w-full p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <IconLogo className={cn('w-5 h-5')} />
          <span className="sr-only">nexa</span>
        </a>
      </div>
      <div>
          <div className="text-xs font-medium truncate select-none">
            {chat.title}
          </div>
      </div>
      <div className="flex gap-0.5">
        <ModeToggle />
        <HistoryContainer location="header" />
      </div>
    </header>
  )
}

export default Header
