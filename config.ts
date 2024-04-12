export const getAbortDelay = (): number => {
  const defaultDelay = 60_000
  const configuredDelay = Number(process.env.ABORT_DELAY)
  return configuredDelay ? configuredDelay : defaultDelay
}
