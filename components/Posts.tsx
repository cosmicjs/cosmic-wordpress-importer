import { PostProps } from "@/types/post"
import Card from "@/components/Elements/card"

export async function Posts({
  posts,
  bucket_slug,
}: {
  posts: PostProps[]
  bucket_slug: string
}) {
  return (
    <div className="mb-6">
      <h3 className="mb-4 font-bold">Posts</h3>
      <p className="mb-4">
        You have successfully imported your posts. To import again, go to{" "}
        <a
          href={`https://app.cosmicjs.com/${bucket_slug}/object-types/posts`}
          target="_parent"
          className="text-blue-600"
        >
          Object type settings
        </a>{" "}
        to delete the posts and try again.
      </p>
      <div className="mb-6">
        {!posts && <>No posts yet.</>}
        {posts && (
          <>
            <div className="mb-4 grid grid-cols-3 gap-4">
              {posts?.map((post: PostProps) => {
                return (
                  <a
                    href={`https://app.cosmicjs.com/${bucket_slug}/objects/${post.id}`}
                    key={post.id}
                    target="_parent"
                  >
                    <Card data={post} />
                  </a>
                )
              })}
            </div>
            <div>
              <a
                href={`https://app.cosmicjs.com/${bucket_slug}/objects?query={"type":"posts"}`}
                className="text-blue-700"
              >
                View more &rarr;
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
