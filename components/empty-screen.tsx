import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'DeepSeek R1 là gì?',
    message: 'DeepSeek R1 là gì?'
  },
  {
    heading: 'Tại sao Nvidia lại phát triển nhanh chóng?',
    message: 'Tại sao Nvidia lại phát triển nhanh chóng?'
  },
  {
    heading: 'Tesla với Rivian',
    message: 'Tesla với Rivian'
  },
  {
    heading: 'Tóm tắt: https://arxiv.org/pdf/2501.05707',
    message: 'Tóm tắt: https://arxiv.org/pdf/2501.05707'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-2 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
