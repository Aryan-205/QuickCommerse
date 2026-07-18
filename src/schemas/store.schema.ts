import { z } from 'zod'

export const CreateStoreSchema = z.object({
  name: z.string().min(1, 'Store name is required'),
  code: z.string().min(1, 'Store code is required'),
  phone: z.string().min(10, 'Store phone number is required'),
  email: z.string().email('Store email must be a valid email'),
  lat: z.number({ required_error: 'Latitude is required' }),
  lng: z.number({ required_error: 'Longitude is required' }),
  delivery_radius_km: z.number().positive('Delivery radius must be a positive number'),
  is_active: z.boolean().optional().default(true),
  is_open: z.boolean().optional().default(true),
  opens_at: z.string().nullable().optional(),
  closes_at: z.string().nullable().optional(),
})

export const UpdateStoreSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  phone: z.string().min(10).optional(),
  email: z.string().email().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  delivery_radius_km: z.number().positive().optional(),
  is_active: z.boolean().optional(),
  is_open: z.boolean().optional(),
  opens_at: z.string().nullable().optional(),
  closes_at: z.string().nullable().optional(),
})

export const StoreResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  phone: z.string(),
  email: z.string(),
  lat: z.number(),
  lng: z.number(),
  delivery_radius_km: z.number(),
  is_active: z.boolean(),
  is_open: z.boolean(),
  opens_at: z.string().nullable(),
  closes_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const ServiceabilityCheckQuerySchema = z.object({
  lat: z.coerce.number({ required_error: 'lat (latitude) is required' }),
  lng: z.coerce.number({ required_error: 'lng (longitude) is required' }),
})

export const ServiceableStoreResponseSchema = z.object({
  store: z.object({
    id: z.number(),
    name: z.string(),
    eta_minutes: z.number(),
    is_open: z.boolean(),
  }).nullable(),
  message: z.string(),
})
