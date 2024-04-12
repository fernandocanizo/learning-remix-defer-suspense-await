import type { LoaderFunctionArgs } from "@remix-run/node"
import { defer } from "@remix-run/node"
import { useLoaderData, Await } from "@remix-run/react"
import { Suspense } from "react"
import { env } from "node:process"

import { getAbortDelay } from "config"
import { delay } from "~/lib/delay"

const delayData = async (data: string, milliseconds: number): Promise<string> => {
  await delay(milliseconds)
  return data
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
console.log({env})
  const defaultDelay = 3000 // ms, 3 seconds
  // A little cherry to play with different delays from the browser
  const url = new URL(request.url)
  let ms = Number(url.searchParams.get("ms"))
  ms = ms && ms < getAbortDelay() ? ms : defaultDelay

  return defer({
    milliseconds: ms,
    firstData: delayData("First datum", ms),
    secondData: delayData("Second datum", ms + 2000),
    })
}

export default function Deferred() {
  const { milliseconds, firstData, secondData } = useLoaderData<typeof loader>()

  return (
    <div>
      <p>After {milliseconds} milliseconds we will see the datum.</p>
      <Suspense fallback="loading first...">
        <Await resolve={firstData}>
          {datum =>
            <p>&quot;{datum}&quot;</p>
          }
        </Await>
      </Suspense>
      <p>And this other datum will appear a second after:</p>
      <Suspense fallback="loading second...">
        <Await resolve={secondData}>
          {datum =>
            <p>&quot;{datum}&quot;</p>
          }
        </Await>
      </Suspense>
    </div>
  )
}
