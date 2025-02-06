import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getBlogPost } from "@/lib/blog"
import { formatDate } from "@/lib/utils"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-10 prose prose-gray dark:prose-invert max-w-3xl mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <time dateTime={post.date} className="text-muted-foreground">
          {formatDate(post.date)}
        </time>
      </div>
      <MDXRemote source={post.content} />
    </article>
  )
}

