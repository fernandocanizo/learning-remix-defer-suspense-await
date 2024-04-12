import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { delay } from "~/lib/delay"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const datum = "I'm the datum"
  const defaultDelay = 3000 // ms, 3 seconds
  const url = new URL(request.url)
  let milliseconds = Number(url.searchParams.get("ms"))
  milliseconds = milliseconds ? milliseconds : defaultDelay

  await delay(milliseconds)

  return json({ milliseconds, datum })
}

export default function Product() {
  const { milliseconds, datum } = useLoaderData<typeof loader>()

  return (
    <div>
      <p>&quot;{datum}&quot; received after {milliseconds} milliseconds.</p>
    </div>
  )
}

