import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.slug} className="group relative rounded-lg border p-6 hover:bg-muted">
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-medium tracking-tight">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
              </div>
              <time dateTime={post.date} className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </time>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

