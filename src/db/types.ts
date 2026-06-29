import type { Insertable, Selectable, Updateable } from 'kysely'
import type { AddressTable, ItemTable, OrderTable, StoreTable, UserTable } from '../types/db.d.ts'

export type Item = Selectable<ItemTable>

export type User = Selectable<UserTable>
export type Customer = User

export type Order = Selectable<OrderTable>

export type Store = Selectable<StoreTable>
export type StoreWithAddresses = Store & {
  addresses: AddressTable[]
}

export type PublicUser = Omit<User, 'password'>
export type PublicCustomer = PublicUser

export type CreateAddressInput = Omit<
  Insertable<AddressTable>,
  'user_id' | 'rider_id' | 'store_id'
>

export type CreateCustomerInput = Pick<
  Insertable<UserTable>,
  'name' | 'email' | 'password' | 'phone'
> & {
  address: CreateAddressInput
}

export type UpdateCustomerInput = Updateable<UserTable>

export type CreateItemInput = Insertable<ItemTable>
export type UpdateItemInput = Updateable<ItemTable>

export type CreateOrderInput = Insertable<OrderTable>
export type UpdateOrderInput = Updateable<OrderTable>
