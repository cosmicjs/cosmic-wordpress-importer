import { createBucketClient } from "@cosmicjs/sdk"
import { Rss } from "lucide-react"

import { Bucket } from "@/types/bucket"
import { Form } from "@/components/Form"
import { Posts } from "@/components/Posts"

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Bucket
}) {
  const cosmic = createBucketClient({
    bucketSlug: searchParams.bucket_slug,
    readKey: searchParams.read_key,
    writeKey: searchParams.write_key,
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
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Import your WordPress blog posts into Cosmic
        </h1>
        {!posts ? (
          <>
            <p className="mb-4 max-w-[700px] text-lg text-muted-foreground">
              Use the form below to import blog posts from any WordPress RSS
              feed <Rss className="inline h-4 w-4" />
            </p>
            <div className="mb-4">
              <h3 className="mb-4 font-bold">What will happen?</h3>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                A new Object type will be added to your Bucket (
                <code>posts</code>) with the correct model to add your posts.
                Make sure you do not have an Object type with slug `posts` or it
                will throw an error.
              </p>
            </div>
            <div className="mb-6">
              <Form
                bucket_slug={searchParams.bucket_slug}
                read_key={searchParams.read_key}
                write_key={searchParams.write_key}
              />
            </div>
          </>
        ) : (
          <div className="mt-4">
            <Posts posts={posts} bucket_slug={searchParams.bucket_slug} />
          </div>
        )}
        <div className="mb-6">
          <h3 className="font-bold">Support</h3>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Would you like more dedicated migration support?{" "}
            <a
              href="https://www.cosmicjs.com/contact"
              target="_blank"
              className="text-blue-600"
              rel="noreferrer"
            >
              Contact us
            </a>{" "}
            and we will be glad to assist!
          </p>
        </div>
      </div>
    </section>
  )
}
