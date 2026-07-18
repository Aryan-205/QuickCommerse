import type { Insertable, Selectable, Updateable } from 'kysely'
import type {
  UserTable,
  AddressTable,
  StoreTable,
  CategoryTable,
  BrandTable,
  ProductTable,
  ProductVariantTable,
  StoreInventoryTable,
  CartTable,
  CartItemTable,
  OrderTable,
  OrderItemTable,
  RiderTable,
} from '../types/db.d.ts'

// Users
export type User = Selectable<UserTable>
export type CreateUserInput = Insertable<UserTable>
export type UpdateUserInput = Updateable<UserTable>
export type PublicUser = Omit<User, 'password'>

// Legacy support if services use Customer/PublicCustomer
export type Customer = User
export type PublicCustomer = PublicUser
export type CreateCustomerInput = Omit<Insertable<UserTable>, 'role'>
export type UpdateCustomerInput = Updateable<UserTable>

// Addresses
export type Address = Selectable<AddressTable>
export type CreateAddressInput = Insertable<AddressTable>
export type UpdateAddressInput = Updateable<AddressTable>

// Stores
export type Store = Selectable<StoreTable>
export type CreateStoreInput = Insertable<StoreTable>
export type UpdateStoreInput = Updateable<StoreTable>

// Catalog
export type Category = Selectable<CategoryTable>
export type CreateCategoryInput = Insertable<CategoryTable>
export type UpdateCategoryInput = Updateable<CategoryTable>

export type Brand = Selectable<BrandTable>
export type CreateBrandInput = Insertable<BrandTable>
export type UpdateBrandInput = Updateable<BrandTable>

export type Product = Selectable<ProductTable>
export type CreateProductInput = Insertable<ProductTable>
export type UpdateProductInput = Updateable<ProductTable>

export type ProductVariant = Selectable<ProductVariantTable>
export type CreateProductVariantInput = Insertable<ProductVariantTable>
export type UpdateProductVariantInput = Updateable<ProductVariantTable>

// Store Inventory
export type StoreInventory = Selectable<StoreInventoryTable>
export type CreateStoreInventoryInput = Insertable<StoreInventoryTable>
export type UpdateStoreInventoryInput = Updateable<StoreInventoryTable>

// Cart
export type Cart = Selectable<CartTable>
export type CreateCartInput = Insertable<CartTable>
export type UpdateCartInput = Updateable<CartTable>

export type CartItem = Selectable<CartItemTable>
export type CreateCartItemInput = Insertable<CartItemTable>
export type UpdateCartItemInput = Updateable<CartItemTable>

// Orders
export type Order = Selectable<OrderTable>
export type CreateOrderInput = Insertable<OrderTable>
export type UpdateOrderInput = Updateable<OrderTable>

export type OrderItem = Selectable<OrderItemTable>
export type CreateOrderItemInput = Insertable<OrderItemTable>

// Riders
export type Rider = Selectable<RiderTable>
export type CreateRiderInput = Insertable<RiderTable>
export type UpdateRiderInput = Updateable<RiderTable>

