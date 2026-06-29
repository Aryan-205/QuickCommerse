import type { ColumnType, Generated } from 'kysely'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'card' | 'upi' | 'cod' | 'wallet'

export interface Database {
  users: UserTable
  riders: RiderTable
  stores: StoreTable
  items: ItemTable
  addresses: AddressTable
  orders: OrderTable
  order_items: OrderItemTable
}

interface BaseTable {
  id: Generated<number>
  created_at: ColumnType<string, string | undefined, string>
  updated_at: ColumnType<string, string | undefined, string>
}

export interface UserTable extends BaseTable {
  name: string
  email: string
  password: string
  phone: string
  profile_picture: string | null
}

export interface RiderTable extends BaseTable {
  name: string
  email: string
  password: string
  phone: string
  profile_picture: string | null
  is_active: boolean
}

export interface AddressTable extends BaseTable {
  user_id: number | null
  rider_id: number | null
  store_id: number | null
  address_line_1: string
  address_line_2: string | null
  city: string
  state: string
  country: string
  postal_code: string
  lat: number
  lng: number
  is_default: boolean
}

export interface StoreTable extends BaseTable {
  name: string
  code: string
  phone: string
  email: string
  is_active: boolean
}

export interface ItemTable extends BaseTable {
  store_id: number
  name: string
  description: string
  price: number
  thumbnail_url: string
  images: string[]
}

export interface OrderTable extends BaseTable {
  user_id: number
  store_id: number
  rider_id: number | null
  delivery_address_id: number
  total_price: number
  status: OrderStatus
  order_number: string
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  payment_id: string | null
  payment_url: string | null
}

export interface OrderItemTable {
  order_id: number
  item_id: number
  quantity: number
  unit_price: number
}

// Composed types for API / service layer (use joins to populate)
export type UserWithAddresses = UserTable & { addresses: AddressTable[] }
export type RiderWithAddresses = RiderTable & { addresses: AddressTable[] }
export type StoreWithAddresses = StoreTable & { addresses: AddressTable[] }
export type OrderWithItems = OrderTable & {
  items: (OrderItemTable & { item: ItemTable })[]
}
