import type { Response } from 'express'

export function handleError(
  res: Response,
  error: unknown,
  fallbackStatus = 500,
) {
  const message =
    error instanceof Error ? error.message : 'Internal server error'

  if (message === 'A user with this email already exists') {
    return res.status(409).json({ message })
  }

  if (
    message.endsWith('not found') ||
    message.endsWith('Not found') ||
    message === 'User not found' ||
    message === 'Order not found'
  ) {
    return res.status(404).json({ message })
  }

  if (
    message.includes('required') ||
    message.includes('Invalid') ||
    message.includes('already exists') ||
    message.includes('empty')
  ) {
    return res.status(400).json({ message })
  }

  return res.status(fallbackStatus).json({ message })
}
