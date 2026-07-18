import { z } from 'zod'

export const AddToCartSchema = z.object({
  user_id: z.number({ required_error: 'user_id is required' }),
  store_id: z.number({ required_error: 'store_id is required' }),
  variant_id: z.number({ required_error: 'variant_id is required' }),
  quantity: z.number().int().nonnegative('Quantity must be zero or a positive integer'),
})

export const CartItemResponseSchema = z.object({
  variant_id: z.number(),
  product_name: z.string(),
  variant_name: z.string(),
  mrp: z.number(),
  selling_price: z.number(),
  quantity: z.number(),
  line_total: z.number(),
  thumbnail_url: z.string().nullable(),
})

export const CartResponseSchema = z.object({
  store_id: z.number(),
  items: z.array(CartItemResponseSchema),
  subtotal: z.number(),
  delivery_fee: z.number(),
  platform_fee: z.number(),
  total: z.number(),
})
