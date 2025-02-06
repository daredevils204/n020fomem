import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost } from "@/types/blog"

const POSTS_PATH = path.join(process.cwd(), "content/blog")

export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(POSTS_PATH)

  const posts = files
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const filePath = path.join(POSTS_PATH, file)
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContent)

      return {
        title: data.title,
        slug: file.replace(/\.mdx?$/, ""),
        date: data.date,
        description: data.description,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      title: data.title,
      slug,
      date: data.date,
      description: data.description,
      content,
    }
  } catch (error) {
    return null
  }
}

