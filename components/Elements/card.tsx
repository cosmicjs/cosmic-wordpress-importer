import { format, parseISO } from "date-fns"

import { PostProps } from "@/types/post"

import Badge from "./badge"

const Card = ({ data }: { data: PostProps }) => {
  const { title, metadata } = data
  const { categories, published_date, author, snippet } = metadata
  let date
  if (published_date) date = format(parseISO(published_date), "MMMM dd, yyyy")
  return (
    <article className="hover:outline-cosmic-blue dark:border-dark-gray-100 dark:bg-dark-gray-50 group flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow hover:outline dark:border dark:bg-slate-900">
      <div className="flex h-full flex-col justify-between p-6">
        <main className="flex h-full flex-1 flex-col justify-between">
          <div>
            <h2 className="dark:text-dark-gray-900 dark: mb-2 mt-4 select-none text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <div className="dark:text-dark-gray-900 mb-1 text-gray-700 dark:text-gray-100">
              {author}
            </div>
            <div className="dark:text-dark-gray-900 mb-4 text-sm text-gray-700 dark:text-gray-300">
              {date}
            </div>
            <p className="dark:text-dark-gray-700 mb-4 h-full grow select-none text-sm dark:text-gray-300">
              {snippet}
            </p>
          </div>
          <footer>
            {categories &&
              categories?.split(",").map((category) => {
                return (
                  <div className="mb-3 mr-2 inline-block">
                    <Badge label={category} />
                  </div>
                )
              })}
          </footer>
        </main>
      </div>
    </article>
  )
}

export default Card
