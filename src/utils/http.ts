import type { Response } from "express";

export function handleControllerError(
  res: Response,
  error: unknown,
  notFoundStatus = 404,
  badRequestStatus = 400
) {
  const message =
    error instanceof Error ? error.message : "Internal server error";

  if (message === "A user with this email already exists") {
    return res.status(409).json({ message });
  }

  if (
    message.endsWith("not found") ||
    message.endsWith("Not found") ||
    message === "User not found" ||
    message === "Cart not found" ||
    message === "Order not found"
  ) {
    return res.status(notFoundStatus).json({ message });
  }

  if (
    message.includes("required") ||
    message.includes("Invalid") ||
    message.includes("Insufficient stock") ||
    message.includes("already exists") ||
    message.includes("empty") ||
    message.includes("Invalid status transition")
  ) {
    return res.status(badRequestStatus).json({ message });
  }

  return res.status(500).json({ message });
}

export function parseId(value: string, fieldName = "id"): number {
  const id = Number(value);
  if (Number.isNaN(id)) {
    throw new Error(`Invalid ${fieldName}`);
  }
  return id;
}
