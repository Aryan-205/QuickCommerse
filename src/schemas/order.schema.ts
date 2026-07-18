import { z } from 'zod'

export const CreateOrderSchema = z.object({
  user_id: z.number({ required_error: 'user_id is required' }),
  store_id: z.number({ required_error: 'store_id is required' }),
  address_id: z.number({ required_error: 'address_id is required' }),
  payment_method: z.enum(['card', 'upi', 'cod', 'wallet']),
})

export const UpdateOrderStatusSchema = z.object({
  status: z.enum([
    'pending',
    'confirmed',
    'preparing',
    'packed',
    'out_for_delivery',
    'delivered',
    'cancelled',
  ]),
  cancellation_reason: z.string().nullable().optional(),
})

export const OrderItemResponseSchema = z.object({
  variant_id: z.number(),
  product_name: z.string(),
  variant_name: z.string(),
  unit_price: z.number(),
  mrp: z.number(),
  quantity: z.number(),
  line_total: z.number(),
})

export const OrderResponseSchema = z.object({
  id: z.number(),
  order_number: z.string(),
  user_id: z.number(),
  store_id: z.number(),
  rider_id: z.number().nullable(),
  delivery_address_id: z.number(),
  subtotal: z.number(),
  delivery_fee: z.number(),
  platform_fee: z.number(),
  discount_amount: z.number(),
  total_amount: z.number(),
  status: z.enum([
    'pending',
    'confirmed',
    'preparing',
    'packed',
    'out_for_delivery',
    'delivered',
    'cancelled',
  ]),
  payment_method: z.enum(['card', 'upi', 'cod', 'wallet']),
  payment_status: z.enum(['pending', 'paid', 'failed', 'refunded']),
  payment_id: z.string().nullable(),
  payment_url: z.string().nullable(),
  estimated_delivery_at: z.string().nullable(),
  delivered_at: z.string().nullable(),
  cancelled_at: z.string().nullable(),
  cancellation_reason: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  items: z.array(OrderItemResponseSchema).optional(),
})
