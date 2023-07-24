import { createBucketClient } from "@cosmicjs/sdk"

import { Bucket } from "@/types/bucket"

type Post = {
  id: string
  title: string
}
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
        .props(["id", "title"])
        .limit(5)
    ).objects
  } catch (e) {
    console.log(e)
  }
  return (
    <div className="mb-6">
      <h3 className="mb-4 font-bold">Posts</h3>
      <div className="mb-6">
        {!posts && <>No posts yet.</>}
        {posts &&
          posts?.map((post: Post) => {
            return (
              <div className="mb-4" key={post.id}>
                <a
                  href={`https://app.cosmicjs.com/${bucket.bucket_slug}/objects/${post.id}`}
                  className="text-blue-700"
                >
                  {post.title}
                </a>
              </div>
            )
          })}
        {posts && (
          <div>
            <a
              href={`https://app.cosmicjs.com/${bucket.bucket_slug}/objects?query={"type":"posts"}`}
              className="text-blue-700"
            >
              View more &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
