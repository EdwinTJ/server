import { Request, Response, NextFunction } from "express";

export const validateStylist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, phone } = req.body;

  // For update requests, skip validation for missing fields
  const isUpdate = req.method === "PUT";

  // Email validation
  if (!isUpdate || email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
  }

  // Password validation (at least 8 characters, containing letters and numbers)
  if (!isUpdate || password !== undefined) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and contain letters and numbers",
      });
    }
  }

  // Name validation
  if (!isUpdate || firstName !== undefined) {
    if (!firstName || typeof firstName !== "string" || firstName.length < 2) {
      return res.status(400).json({ message: "Valid first name is required" });
    }
  }

  if (!isUpdate || lastName !== undefined) {
    if (!lastName || typeof lastName !== "string" || lastName.length < 2) {
      return res.status(400).json({ message: "Valid last name is required" });
    }
  }

  // Phone validation (basic format)
  if (!isUpdate || phone !== undefined) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Valid phone number is required" });
    }
  }

  next();
};
