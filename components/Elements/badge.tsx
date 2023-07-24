export default function Badge({ label }: { label: string }) {
  return (
    <span className="h-max w-max rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700">
      {label}
    </span>
  )
}
