import type { LoaderFunctionArgs } from "@remix-run/node"
import { defer } from "@remix-run/node"
import { useLoaderData, Await } from "@remix-run/react"
import { Suspense } from "react"

// TODO I wanted to make a single curried function from `delay` and `delayData`
// but Typescript gave me a headache
const delay = (milliseconds: number): Promise<string> =>
  new Promise(resolve => setTimeout(resolve, milliseconds))

const delayData = async (data: string, milliseconds: number): Promise<string> => {
  await delay(milliseconds)
  return data
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const defaultDelay = 3000 // ms, 3 seconds
  // A little cherry to play with different delays from the browser
  const url = new URL(request.url)
  let ms = Number(url.searchParams.get("ms"))
  // By default Node.js or Remix or something has a 5 seconds timeout
  // Don't know where to configure that yet
  ms = ms && ms < 5000 ? ms : defaultDelay

  return defer({
    milliseconds: ms,
    firstData: delayData("First datum", 1000),
    secondData: delayData("Second datum", 4000),
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
