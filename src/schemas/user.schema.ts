import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['customer', 'admin', 'store_manager']).optional().default('customer'),
})

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  phone: z.string().min(10).optional(),
  profile_picture: z.string().nullable().optional(),
  role: z.enum(['customer', 'admin', 'store_manager']).optional(),
})

export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  profile_picture: z.string().nullable(),
  role: z.enum(['customer', 'admin', 'store_manager']),
  created_at: z.string(),
  updated_at: z.string(),
})
