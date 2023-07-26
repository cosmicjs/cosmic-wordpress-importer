import { NextResponse } from 'next/server'
import { createBucketClient } from "@cosmicjs/sdk"
import Parser from "rss-parser"
const parser = new Parser()

export async function POST(request: Request) {
  const res = await request.json()
  if (!res.bucket.bucket_slug)
    return NextResponse.json({ message: 'Looks like you are trying to access this extension outside of Cosmic. Log in and install this URL in your Cosmic Bucket to use it.' }, { status: 400 })
  const cosmic = createBucketClient({
    bucketSlug: res.bucket.bucket_slug,
    readKey: res.bucket.read_key,
    writeKey: res.bucket.write_key,
  })
  const url = res.url
  const limit = Number(res.limit)

  const groups = Math.ceil(limit / 10)
  let paged = 1
  let content
  const new_object_type = {
    title: "Posts",
    slug: "wp-posts",
    emoji: "📰",
    options: {
      slug_field: true,
      content_editor: false
    },
    metafields: [
      {
        id: "1",
        type: "html-textarea",
        title: "Content",
        key: "content",
        value: "",
      },
      {
        id: "2",
        type: "textarea",
        title: "Snippet",
        key: "snippet",
        value: "",
      },
      {
        id: "3",
        type: "text",
        title: "Author",
        key: "author",
        value: "",
      },
      {
        id: "4",
        type: "date",
        title: "Published Date",
        key: "published_date",
        value: "",
      },
      {
        id: "5",
        type: "text",
        title: "Categories",
        key: "categories",
        value: "",
      },
    ],
  }
  try {
    await cosmic.objectTypes.insertOne(new_object_type)
  } catch (e) {
    return NextResponse.json({ message: 'Looks like you already have a wp-posts Object type. Remove this from your Bucket by going to Posts > Settings before importing your WordPress posts.' }, { status: 400 })
  }
  while (paged <= groups) {
    const feed = await parser.parseURL(url + `?paged=${paged}`)
    const items = feed.items
    for (const item of items) {
      const title = item.title
      if (item.content) content = item.content
      if (item["content:encoded"]) content = item["content:encoded"]
      const snippet = item.contentSnippet
      const date = item.pubDate;
      let published_date = '';
      if (date)
       published_date = (new Date(date)).toISOString().split("T")[0]
      const categories = item?.categories?.join(", ")
      const author = item.creator
      const object = {
        title,
        type: "wp-posts",
        metadata: {
          content,
          snippet,
          author,
          published_date,
          categories,
        },
      }
      try {
        await cosmic.objects.insertOne(object)
      } catch (e) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
    }
    paged++
  }
  return NextResponse.json(request)
}