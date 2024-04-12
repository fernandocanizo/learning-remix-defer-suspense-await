export default function Index() {
  return (
  <>
    <h1><code>{"defer - <Suspense>/<Await>"}</code> demo</h1>

    <ul>
      <li>
        <a href="/not-deferred">
        <code>/not-deferred</code>
        Not deferred data: we wait until data is produced.
        </a>
      </li>
      <li>
        <a href="/deferred">
          <code>/deferred</code>
          Data deferred, rendered as it gets produced.
        </a>
      </li>
      <li>
        <a href="/deferred-all-at-once">
          <code>/deferred-all-at-once</code>
          Deferred data, but it comes all at once, almost the same as in `/not-deferred`.
        </a>
      </li>
    </ul>
  </>
  ) 
}
