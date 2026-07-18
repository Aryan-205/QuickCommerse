import type { ColumnType, Generated } from 'kysely'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'packed'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'card' | 'upi' | 'cod' | 'wallet'

export type UserRole = 'customer' | 'admin' | 'store_manager'

export type RiderStatus = 'offline' | 'available' | 'on_delivery'

export type UnitType = 'piece' | 'kg' | 'g' | 'l' | 'ml' | 'pack'

export interface Database {
  users: UserTable
  addresses: AddressTable
  stores: StoreTable
  categories: CategoryTable
  brands: BrandTable
  products: ProductTable
  product_variants: ProductVariantTable
  store_inventory: StoreInventoryTable
  carts: CartTable
  cart_items: CartItemTable
  orders: OrderTable
  order_items: OrderItemTable
  riders: RiderTable
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
  role: UserRole
}

export interface AddressTable extends BaseTable {
  user_id: number
  label: string
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
  lat: number
  lng: number
  delivery_radius_km: number
  is_active: boolean
  is_open: boolean
  opens_at: string | null
  closes_at: string | null
}

export interface CategoryTable extends BaseTable {
  name: string
  slug: string
  parent_id: number | null
  image_url: string | null
  sort_order: number
  is_active: boolean
}

export interface BrandTable extends BaseTable {
  name: string
  slug: string
}

export interface ProductTable extends BaseTable {
  category_id: number | null
  brand_id: number | null
  name: string
  slug: string
  description: string | null
  thumbnail_url: string | null
  images: string[]
  is_active: boolean
}

export interface ProductVariantTable extends BaseTable {
  product_id: number
  name: string
  sku: string
  barcode: string | null
  unit: UnitType
  unit_value: number
  mrp: number
  thumbnail_url: string | null
  is_active: boolean
}

export interface StoreInventoryTable extends BaseTable {
  store_id: number
  variant_id: number
  selling_price: number
  stock_quantity: number
  reserved_quantity: number
  is_available: boolean
}

export interface CartTable extends BaseTable {
  user_id: number
  store_id: number
}

export interface CartItemTable {
  cart_id: number
  variant_id: number
  quantity: number
}

export interface OrderTable extends BaseTable {
  order_number: string
  user_id: number
  store_id: number
  rider_id: number | null
  delivery_address_id: number
  subtotal: number
  delivery_fee: number
  platform_fee: number
  discount_amount: number
  total_amount: number
  status: OrderStatus
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  payment_id: string | null
  payment_url: string | null
  estimated_delivery_at: string | null
  delivered_at: string | null
  cancelled_at: string | null
  cancellation_reason: string | null
}

export interface OrderItemTable {
  order_id: number
  variant_id: number
  product_name: string
  variant_name: string
  unit_price: number
  mrp: number
  quantity: number
  line_total: number
}

export interface RiderTable extends BaseTable {
  name: string
  email: string
  password: string
  phone: string
  profile_picture: string | null
  is_active: boolean
  status: RiderStatus
  current_lat: number | null
  current_lng: number | null
}

export type UserWithAddresses = UserTable & { addresses: AddressTable[] }
export type ProductWithVariants = ProductTable & { variants: ProductVariantTable[] }
export type CartWithItems = CartTable & { items: (CartItemTable & { variant: ProductVariantTable })[] }
export type OrderWithItems = OrderTable & {
  items: (OrderItemTable & { variant: ProductVariantTable })[]
}

