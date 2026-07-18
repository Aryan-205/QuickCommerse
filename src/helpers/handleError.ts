import type { Response } from 'express'
import { ZodError } from 'zod'

export function handleError(
  res: Response,
  error: unknown,
  fallbackStatus = 500,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    })
  }

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

