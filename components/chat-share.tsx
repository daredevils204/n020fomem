'use client'

import { shareChat } from '@/lib/actions/chat'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'
import { Share } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Spinner } from './ui/spinner'

interface ChatShareProps {
  chatId: string
  className?: string
}

export function ChatShare({ chatId, className }: ChatShareProps) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [shareUrl, setShareUrl] = useState('')

  const handleShare = async () => {
    startTransition(() => {
      setOpen(true)
    })
    const result = await shareChat(chatId)
    if (!result) {
      toast.error('Không thể chia sẻ trò chuyện')
      return
    }

    if (!result.sharePath) {
      toast.error('Không thể sao chép liên kết vào khay nhớ tạm')
      return
    }

    const url = new URL(result.sharePath, window.location.href)
    setShareUrl(url.toString())
  }

  const handleCopy = () => {
    if (shareUrl) {
      copyToClipboard(shareUrl)
      toast.success('Liên kết được sao chép vào khay nhớ tạm')
      setOpen(false)
    } else {
      toast.error('Không có liên kết để sao chép')
    }
  }

  return (
    <div className={className}>
      <Dialog
        open={open}
        onOpenChange={open => setOpen(open)}
        aria-labelledby="share-dialog-title"
        aria-describedby="share-dialog-description"
      >
        <DialogTrigger asChild>
          <Button
            className={cn('rounded-full')}
            size="icon"
            variant={'ghost'}
            onClick={() => setOpen(true)}
          >
            <Share size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chia sẻ liên kết đến kết quả tìm kiếm</DialogTitle>
            <DialogDescription>
              Bất kỳ ai có liên kết sẽ có thể xem kết quả tìm kiếm này.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="items-center">
            {!shareUrl && (
              <Button onClick={handleShare} disabled={pending} size="sm">
                {pending ? <Spinner /> : 'Lấy liên kết'}
              </Button>
            )}
            {shareUrl && (
              <Button onClick={handleCopy} disabled={pending} size="sm">
                {'Sao chép liên kết'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
