import { blogPosts } from "@/data/blog"
import { Timeline } from "@/components/ui/timeline"
import { BlogTimelineContent } from "@/components/blog/blog-timeline-content"

export const metadata = {
  title: "Blog | Mon portfolio",
  description:
    "Articles et réflexions sur le développement web, l'accessibilité et les bonnes pratiques.",
}

function formatTimelineDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  const timelineData = blogPosts.map((post) => ({
    title: formatTimelineDate(post.date),
    content: <BlogTimelineContent post={post} />,
  }))

  return (
    <div className="min-h-screen pb-24">
      <div className="relative w-full overflow-hidden">
        <Timeline
          data={timelineData}
          title="Blog"
          subtitle="Articles, tutoriels et retours d'expérience sur le développement web et le design."
        />
      </div>
    </div>
  )
}
