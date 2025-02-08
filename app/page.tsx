import { useAuth } from "@/contexts/auth-context"
import { Chat } from '@/components/chat'
import { generateId } from 'ai'

export default function Page() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }

  if (user) {
    return (
      const id = generateId()
  return <Chat id={id} />
    )
  }

  return (
    <div>
      <p>Please login</p>
      <a href="/login">Login</a>
    </div>
  )
}
