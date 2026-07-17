import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)
export const registry = new OpenAPIRegistry();

export const CreateUserSchema = registry.register(
  "CreateUser",
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string(),
  })
);
export const UserSchema = registry.register(
  "User",
  z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    profile_picture: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  })
);

registry.registerPath({
  method: "post",
  path: "/users",
  operationId: "createUser",
  summary: "Create a new user",
  description: "Create a new user with the given name, email and password",
  request: {
    body: { content: { "application/json": { schema: CreateUserSchema } } },
  },
  responses: {
    201: {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            user: UserSchema,
          }),
        }
      }
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        }
      }
    }
  }
})

registry.registerPath({
  method: "get",
  path: "/users/{id}",
  operationId: "getUser",
  summary: "Get a user by ID",
  description: "Get a user by ID",
  request: {
    params: { content: { "application/json": { schema: z.object({ id: z.number() }) } } },
  },
  responses: {
    200: {
      description: "User found",
      content: {
        "application/json": {
          schema: z.object({ user: UserSchema }),
        }
      }
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        }
      }
    }
  }
});
export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.3",
    info: {
      title: "LargeCommerse API",
      version: "1.0.0",
      description: "Commerce API for users, items, orders, and stores",
    },
    servers: [{ url: "http://localhost:3000" }],
  });
}