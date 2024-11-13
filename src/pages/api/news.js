import { neon } from "@neondatabase/serverless";
import multer from "multer";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const sql = neon(process.env.DATABASE_URL);
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Upload file to AWS S3
const uploadFile = async (file) => {
  const fileName = `${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `news/${fileName}`,
    Body: file.buffer,
    ACL: "public-read",
  };

  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response.Location;
  } catch (error) {
    throw new Error("Error uploading file to S3: " + error.message);
  }
};

// Delete file from AWS S3
const deleteFile = async (imageUrl) => {
  const fileName = imageUrl.split("/").pop();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `news/${fileName}`,
  };
  await s3.deleteObject(params).promise();
};

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser to allow multer to parse the file
  },
};

// API handler
export default async function handler(req, res) {
  const { id } = req.query;

  if (id) {
    switch (req.method) {
      case "GET":
        try {
          const newsItem =
            await sql`SELECT * FROM news WHERE id = ${id} LIMIT 1`;
          if (newsItem.length === 0) {
            return res.status(404).json({ message: "News item not found" });
          }
          res.status(200).json(newsItem[0]);
        } catch (error) {
          console.error("Error retrieving news item:", error);
          res.status(500).json({ message: "Error retrieving news item" });
        }
        break;

      case "PUT":
        upload.single("image")(req, res, async (err) => {
          if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ message: "Error uploading file" });
          }

          const { title, details, category } = req.body;

          try {
            const newsItem =
              await sql`SELECT * FROM news WHERE id = ${id} LIMIT 1`;
            if (newsItem.length === 0) {
              return res.status(404).json({ message: "News item not found" });
            }

            let imageUrl = newsItem[0].image_url;

            if (req.file) {
              // Delete the previous image from S3 if a new one is uploaded
              if (imageUrl) {
                const fileName = imageUrl.split("/").pop();
                const params = {
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: `news/${fileName}`,
                };
                await s3.deleteObject(params).promise();
              }

              // Upload the new image to S3
              const fileName = `${uuidv4()}-${req.file.originalname}`;
              const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `news/${fileName}`,
                Body: req.file.buffer,
                ACL: "public-read",
              };
              const s3Response = await s3.upload(params).promise();
              imageUrl = s3Response.Location;
            }

            // Update the news item in the database
            await sql`
              UPDATE news
              SET
                title = ${title},
                details = ${details},
                category = ${category},
                image_url = ${imageUrl}
              WHERE id = ${id}
              RETURNING *;
            `;

            res.status(200).json({ message: "News item updated successfully" });
          } catch (error) {
            console.error("Error updating news item:", error);
            res.status(500).json({ message: "Error updating news item" });
          }
        });
        break;

      case "DELETE":
        try {
          const newsItem =
            await sql`SELECT * FROM news WHERE id = ${id} LIMIT 1`;
          if (newsItem.length === 0) {
            return res.status(404).json({ message: "News item not found" });
          }

          const imageUrl = newsItem[0].image_url;
          if (imageUrl) {
            await deleteFile(imageUrl); // Delete image from S3
          }

          await sql`DELETE FROM news WHERE id = ${id}`;
          res.status(200).json({ message: "News item deleted successfully" });
        } catch (error) {
          console.error("Error deleting news item:", error);
          res.status(500).json({ message: "Error deleting news item" });
        }
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } else {
    switch (req.method) {
      case "GET":
        try {
          const data = await sql`SELECT * FROM news`;
          if (data.length === 0) {
            return res.status(200).send("empty");
          }
          res.status(200).json(data);
        } catch (error) {
          console.error("Error retrieving news items:", error);
          res.status(500).json({ message: "Error retrieving news items" });
        }
        break;

      case "POST":
        // Handle file upload with multer middleware
        upload.single("image")(req, res, async (err) => {
          if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ message: "Error uploading file" });
          }

          const { title, details, category } = req.body;

          if (!title || !details || !req.file) {
            console.error("Missing required fields or image");
            return res
              .status(400)
              .json({ message: "Missing required fields or image" });
          }

          try {
            const imageUrl = await uploadFile(req.file); // Upload image to S3
            const query = await sql`
              INSERT INTO news (id, title, details, category, image_url)
              VALUES (${uuidv4()}, ${title}, ${details}, ${category}, ${imageUrl})
              RETURNING *;
            `;
            res.status(201).json(query);
          } catch (error) {
            console.error("Error adding news item:", error);
            res.status(500).json({ message: "Error adding news item" });
          }
        });
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  }
}
