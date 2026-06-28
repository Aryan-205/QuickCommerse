export interface Customer {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  role?: string;
  status?: string;
}

export interface UpdateCustomerInput {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  role?: string;
  status?: string;
}

export type PublicCustomer = Omit<Customer, "password">;
