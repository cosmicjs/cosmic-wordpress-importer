"use client"

import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const handleSubmit = async (e: any, bucket: any, setSubmitting: any) => {
  e.preventDefault()
  setSubmitting(true)
  const url = e.target.url.value
  const limit = e.target.limit.value
  await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, limit, bucket }),
  })
  setSubmitting(false)
}

export function Form(props: any) {
  const [submitting, setSubmitting] = useState(false)
  return (
    <form onSubmit={(e) => handleSubmit(e, props.bucket, setSubmitting)}>
      <div style={{ marginBottom: 10 }} className="flex gap-4">
        <div>
          <label>
            Feed URL
            <Input
              className="w-[300px]"
              type="text"
              name="url"
              placeholder="Enter WordPress RSS feed URL"
              defaultValue="https://github.blog/feed"
            />
          </label>
        </div>
        <div>
          <label>
            Number of posts (max 100)
            <Input
              className="w-[150px]"
              type="number"
              name="limit"
              placeholder="Number of posts"
              defaultValue="10"
              max={100}
            />
          </label>
        </div>
      </div>
      <Button type="submit" className={buttonVariants()}>
        {submitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}
