import { z } from 'zod'

export const CreateAddressSchema = z.object({
  label: z.string().min(1, 'Label is required (e.g. Home, Work)'),
  address_line_1: z.string().min(1, 'Address line 1 is required'),
  address_line_2: z.string().nullable().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  lat: z.number({ required_error: 'Latitude is required' }),
  lng: z.number({ required_error: 'Longitude is required' }),
  is_default: z.boolean().optional().default(false),
})

export const AddressResponseSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  label: z.string(),
  address_line_1: z.string(),
  address_line_2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
  lat: z.number(),
  lng: z.number(),
  is_default: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})
