"use client"

import { FormEvent, useCallback, useState } from "react"
import { Loader2 } from "lucide-react"

import { Bucket } from "@/types/bucket"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

export function Form(bucket: Bucket) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault()
      setSubmitting(true)
      const target = e.target as typeof e.target & {
        url: { value: string }
        limit: { value: string }
      }
      const url = target.url.value
      const limit = target.limit.value
      try {
        const res = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, limit, bucket }),
        })
        const data = await res.json()
        if (res.status === 200) {
          toast({
            title: "Posts added!",
            description:
              "Go to your Bucket Objects area to see your newly imported posts!",
          })
          setSuccess(true)
        } else {
          toast({
            title: "Oops!",
            variant: "destructive",
            description: data.message,
          })
        }
      } catch {
        toast({
          title: "Oops!",
          variant: "destructive",
          description: "There was an error.",
        })
      }
      setSubmitting(false)
    },
    [toast, bucket, setSubmitting, setSuccess]
  )
  return (
    <>
      {!success ? (
        <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <h3 className="mb-4 font-bold">Import posts</h3>
          <div className="mb-4">
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
          <Button
            disabled={submitting}
            type="submit"
            variant="default"
            size={submitting ? "icon" : "default"}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      ) : (
        <div>
          Success!{" "}
          <a href="" className="text-blue-600">
            Reload this page
          </a>{" "}
          to see your posts.
        </div>
      )}
      <Toaster />
    </>
  )
}
