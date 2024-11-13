import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const queryResult = await sql`
      SELECT * FROM admins WHERE username = ${username} LIMIT 1
    `;

    if (queryResult.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = queryResult[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { username: admin.username, id: admin.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // Set the token in a cookie
    res.setHeader("Set-Cookie", [
      `token=${token}; Path=/; HttpOnly; SameSite=Strict; ${
        process.env.NODE_ENV === "production" ? "Secure;" : ""
      }`,
    ]);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
