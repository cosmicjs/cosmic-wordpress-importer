import { Form } from "@/components/Form"

export default async function IndexPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: {
    bucket_slug: string
    read_key: string
    write_key: string
  }
}) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Import your WordPress blog posts into Cosmic
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Use the form below to add import blog posts from WordPress website
          that has the RSS feed available.
        </p>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A new Object type will be added to your Bucket (<code>posts</code>)
          with the correct model to add your posts. **Make sure you do not have
          a Object type with slug `posts` or it will throw an error!
        </p>
      </div>
      <div>
        Try{" "}
        <a
          href="https://github.blog/feed"
          target="_blank"
          className="text-blue-600"
          rel="noreferrer"
        >
          https://github.blog/feed
        </a>
      </div>
      <Form bucket={searchParams} />
    </section>
  )
}
