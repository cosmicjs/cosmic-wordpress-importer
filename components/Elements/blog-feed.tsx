import Card from "@/components/Elements/card"

export default function BlogFeed({ posts }: { posts: any[] }) {
  return (
    <div className="flex max-w-xl flex-col gap-8">
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Card data={post} />
            </div>
          )
        })}
    </div>
  )
}
