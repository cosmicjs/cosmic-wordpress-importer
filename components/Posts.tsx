import { createBucketClient } from "@cosmicjs/sdk"

import { Bucket } from "@/types/bucket"
import { PostProps } from "@/types/post"
import Card from "@/components/Elements/card"

export async function Posts(bucket: Bucket) {
  const cosmic = createBucketClient({
    bucketSlug: bucket.bucket_slug,
    readKey: bucket.read_key,
    writeKey: bucket.write_key,
  })
  let posts
  try {
    posts = (
      await cosmic.objects
        .find({
          type: "posts",
        })
        .props([
          "id",
          "title",
          "metadata.author",
          "metadata.snippet",
          "metadata.published_date",
          "metadata.categories",
        ])
        .limit(6)
    ).objects
  } catch (e) {
    console.log(e)
  }
  return (
    <div className="mb-6">
      <h3 className="mb-4 font-bold">Posts</h3>
      <div className="mb-6">
        {!posts && <>No posts yet.</>}
        {posts && (
          <>
            <div className="mb-4 grid grid-cols-3 gap-4">
              {posts?.map((post: PostProps) => {
                return (
                  <a
                    href={`https://app.cosmicjs.com/${bucket.bucket_slug}/objects/${post.id}`}
                    key={post.id}
                  >
                    <Card data={post} />
                  </a>
                )
              })}
            </div>
            <div>
              <a
                href={`https://app.cosmicjs.com/${bucket.bucket_slug}/objects?query={"type":"posts"}`}
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
