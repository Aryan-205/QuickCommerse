import { z } from 'zod'

// Category
export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Category slug is required'),
  parent_id: z.number().nullable().optional(),
  image_url: z.string().nullable().optional(),
  sort_order: z.number().int().optional().default(0),
  is_active: z.boolean().optional().default(true),
})

export const UpdateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  parent_id: z.number().nullable().optional(),
  image_url: z.string().nullable().optional(),
  sort_order: z.number().int().optional(),
  is_active: z.boolean().optional(),
})

export const CategoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  parent_id: z.number().nullable(),
  image_url: z.string().nullable(),
  sort_order: z.number(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

// Brand
export const CreateBrandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  slug: z.string().min(1, 'Brand slug is required'),
})

export const UpdateBrandSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
})

export const BrandResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

// Product
export const CreateProductSchema = z.object({
  category_id: z.number().nullable().optional(),
  brand_id: z.number().nullable().optional(),
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Product slug is required'),
  description: z.string().nullable().optional(),
  thumbnail_url: z.string().nullable().optional(),
  images: z.array(z.string()).optional().default([]),
  is_active: z.boolean().optional().default(true),
})

export const UpdateProductSchema = z.object({
  category_id: z.number().nullable().optional(),
  brand_id: z.number().nullable().optional(),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  thumbnail_url: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
  is_active: z.boolean().optional(),
})

export const ProductResponseSchema = z.object({
  id: z.number(),
  category_id: z.number().nullable(),
  brand_id: z.number().nullable(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  thumbnail_url: z.string().nullable(),
  images: z.array(z.string()),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

// Product Variant (SKU)
export const CreateProductVariantSchema = z.object({
  product_id: z.number({ required_error: 'product_id is required' }),
  name: z.string().min(1, 'Variant name (e.g. 500 g) is required'),
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().nullable().optional(),
  unit: z.enum(['piece', 'kg', 'g', 'l', 'ml', 'pack']),
  unit_value: z.number().positive('Unit value must be positive'),
  mrp: z.number().positive('MRP must be positive'),
  thumbnail_url: z.string().nullable().optional(),
  is_active: z.boolean().optional().default(true),
})

export const UpdateProductVariantSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  barcode: z.string().nullable().optional(),
  unit: z.enum(['piece', 'kg', 'g', 'l', 'ml', 'pack']).optional(),
  unit_value: z.number().positive().optional(),
  mrp: z.number().positive().optional(),
  thumbnail_url: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
})

export const ProductVariantResponseSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  name: z.string(),
  sku: z.string(),
  barcode: z.string().nullable(),
  unit: z.enum(['piece', 'kg', 'g', 'l', 'ml', 'pack']),
  unit_value: z.number(),
  mrp: z.number(),
  thumbnail_url: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

// Store Inventory
export const UpsertStoreInventorySchema = z.object({
  variant_id: z.number({ required_error: 'variant_id is required' }),
  selling_price: z.number().positive('Selling price must be positive'),
  stock_quantity: z.number().int().nonnegative('Stock quantity cannot be negative'),
  reserved_quantity: z.number().int().nonnegative().optional().default(0),
  is_available: z.boolean().optional().default(true),
})

export const StoreInventoryResponseSchema = z.object({
  id: z.number(),
  store_id: z.number(),
  variant_id: z.number(),
  selling_price: z.number(),
  stock_quantity: z.number(),
  reserved_quantity: z.number(),
  is_available: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

// Store Catalog Browse Schema
export const BrowseCatalogQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
})

export const CatalogItemResponseSchema = z.object({
  variant_id: z.number(),
  product_name: z.string(),
  variant_name: z.string(),
  mrp: z.number(),
  selling_price: z.number(),
  discount_percent: z.number(),
  in_stock: z.boolean(),
  thumbnail_url: z.string().nullable(),
})
