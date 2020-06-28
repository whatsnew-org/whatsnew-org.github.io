export interface MarkdownRemark {
  id: string
  excerpt: string
  html: string
  frontmatter: {
    title: string
    date: string
    description: string
  }
}

export interface Node extends MarkdownRemark {
  fields: {
    slug: string
  }
}

export interface Site {
  siteMetadata: {
    title: string
  }
}

export interface Data {
  site: Site
  allMarkdownRemark: {
    edges: {
      node: Node
    }[]
  }
}

export interface BlogPost {
  site: Site
  markdownRemark: MarkdownRemark
}

export interface Post {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}
