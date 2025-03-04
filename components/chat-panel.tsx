"use client"

import { cn } from "@/lib/utils"
import type { Message } from "ai"
import { ArrowUp, MessageCirclePlus, Square, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Textarea from "react-textarea-autosize"
import { EmptyScreen } from "./empty-screen"
import { ModelSelector } from "./model-selector"
import { SearchModeToggle } from "./search-mode-toggle"
import { Button } from "./ui/button"
import { IconLogo } from './ui/icons'

interface ChatPanelProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  messages: Message[]
  setMessages: (messages: Message[]) => void
  query?: string
  stop: () => void
  append: (message: any) => void
}

export function ChatPanel({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
  setMessages,
  query,
  stop,
  append,
}: ChatPanelProps) {
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true)
  const [isComposing, setIsComposing] = useState(false)
  const [enterDisabled, setEnterDisabled] = useState(false)

  const handleCompositionStart = () => setIsComposing(true)

  const handleCompositionEnd = () => {
    setIsComposing(false)
    setEnterDisabled(true)
    setTimeout(() => {
      setEnterDisabled(false)
    }, 300)
  }

  const handleNewChat = () => {
    setMessages([])
    router.push("/")
  }

  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      append({
        role: "user",
        content: query,
      })
      isFirstRender.current = false
    }
  }, [query, append])

  return (
    <div
      className={cn(
        "mx-auto w-full",
        messages.length > 0
          ? "fixed bottom-0 left-0 right-0 bg-background"
          : "fixed bottom-8 left-0 right-0 top-6 flex flex-col items-center justify-center",
      )}
    >
      {messages.length === 0 && (
        <div className="mb-8">
          <IconLogo className="size-12 text-muted-foreground" />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={cn("max-w-3xl w-full mx-auto", messages.length > 0 ? "px-2 py-4" : "px-6")}
      >
        <div className="relative flex flex-col w-full gap-2 bg-muted rounded-3xl border border-input">
          <Textarea
            ref={inputRef}
            name="input"
            rows={2}
            maxRows={5}
            tabIndex={0}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder="Hỏi một câu hỏi..."
            spellCheck={false}
            value={input}
            className="resize-none w-full min-h-12 bg-transparent border-0 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              handleInputChange(e)
              setShowEmptyScreen(e.target.value.length === 0)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isComposing && !enterDisabled) {
                if (input.trim().length === 0) {
                  e.preventDefault()
                  return
                }
                e.preventDefault()
                const textarea = e.target as HTMLTextAreaElement
                textarea.form?.requestSubmit()
              }
            }}
            onFocus={() => setShowEmptyScreen(true)}
            onBlur={() => setShowEmptyScreen(false)}
          />

          {/* Bottom menu area */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <ModelSelector />
              <SearchModeToggle />
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNewChat}
                  className="shrink-0 rounded-full group"
                  type="button"
                  disabled={isLoading}
                >
                  <MessageCirclePlus className="size-4 group-hover:rotate-12 transition-all" />
                </Button>
              )}
              <Button
                type={isLoading ? "button" : "submit"}
                size={"icon"}
                variant={"outline"}
                className={cn(isLoading && "animate-pulse", "rounded-full")}
                disabled={input.length === 0 && !isLoading}
                onClick={isLoading ? stop : undefined}
              >
                {isLoading ? <Square size={20} /> : <ArrowUp size={20} />}
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs tracking-tight text-center text-gray-500 dark:text-gray-400">
          Nexa có thể trả lời sai. Vui lòng kiểm tra thông tin trước khi tin tưởng hoặc sử dụng. Nexa có các thứ tiếng: <a href="https://nexasearch.vercel.app">Tiếng Việt</a> - <a href="https://nekusasachi.vercel.app">Tiếng Nhật</a> - <a href="https://naixun.vercel.app">Tiếng Trung</a> - <a href="https://neksain.vercel.app">Tiếng Hàn</a>
        </p>

        {messages.length === 0 && (
          <EmptyScreen
            submitMessage={(message) => {
              handleInputChange({
                target: { value: message },
              } as React.ChangeEvent<HTMLTextAreaElement>)
            }}
            className={cn(showEmptyScreen ? "visible" : "invisible")}
          />
        )}
      </form>
    </div>
  )
}

