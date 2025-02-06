import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)} {...props} />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn("mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0", className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />
    ),
    p: ({ className, ...props }) => <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />,
    ul: ({ className, ...props }) => <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />,
    ol: ({ className, ...props }) => <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />,
    li: ({ className, ...props }) => <li className={cn("mt-2", className)} {...props} />,
    blockquote: ({ className, ...props }) => (
      <blockquote className={cn("mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground", className)} {...props} />
    ),
    img: ({ className, alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={cn("rounded-md border", className)} alt={alt} {...props} />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)}
        {...props}
      />
    ),
    ...components,
  }
}

