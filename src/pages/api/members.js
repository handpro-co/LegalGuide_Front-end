import { neon } from "@neondatabase/serverless";
import multer from "multer";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config({ path: "./config/.env" });

const sql = neon(process.env.DATABASE_URL);
const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await sql`SELECT * FROM members`;
      if (data.length === 0) {
        return res.status(200).send("empty");
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving members" });
    }
  } else if (req.method === "POST") {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

      const {
        name,
        position,
        introduction,
        education,
        specialization,
        publications,
        training,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      try {
        const fileName = `${uuidv4()}-${req.file.originalname}`;
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `members/${fileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
        };

        const imageUrl = await s3.upload(params).promise().Location;

        await sql`
          INSERT INTO members (id, name, position, introduction, education, specialization, publications, training, image_url)
          VALUES (${uuidv4()}, ${name}, ${position}, ${introduction}, ${education}, ${specialization}, ${publications}, ${training}, ${imageUrl})
          RETURNING *;
        `;

        res.status(201).json({ message: "Member added successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding member" });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    console.log(id);
    
    if (!id) {
      return res.status(400).json({ message: "Member ID is required" });
    }

    try {
      const member = await sql`SELECT * FROM members WHERE id = ${id} LIMIT 1`;
      if (member.length === 0) {
        return res.status(404).json({ message: "Member not found" });
      }

      const imageUrl = member[0].image_url;
      if (imageUrl) {
        const fileName = imageUrl.split("/").pop();
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `members/${fileName}`,
        };
        await s3.deleteObject(params).promise();
      }

      await sql`DELETE FROM members WHERE id = ${id}`;
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting member" });
    }
        } else if (req.method === "PUT") {
          // Handle PUT request to update a member
          const { id } = req.query;

          upload.single("image")(req, res, async (err) => {
            if (err) {
              return res.status(400).json({ message: "Error uploading file" });
            }

            const {
              name,
              position,
              introduction,
              education,
              specialization,
              publications,
              training,
            } = req.body;

            try {
              const member =
                await sql`SELECT * FROM members WHERE id = ${id} LIMIT 1`;
              if (member.length === 0) {
                return res.status(404).json({ message: "Member not found" });
              }

              let imageUrl = member[0].image_url;

              if (req.file) {
                // Delete the previous image from S3 if a new one is uploaded
                if (imageUrl) {
                  const fileName = imageUrl.split("/").pop();
                  const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `members/${fileName}`,
                  };
                  await s3.deleteObject(params).promise();
                }

                // Upload the new image to S3
                const fileName = `${uuidv4()}-${req.file.originalname}`;
                const params = {
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: `members/${fileName}`,
                  Body: req.file.buffer,
                  ACL: "public-read",
                };
                const s3Response = await s3.upload(params).promise();
                imageUrl = s3Response.Location;
              }

              // Update member data in the database
              await sql`
                UPDATE members
                SET
                  name = ${name},
                  position = ${position},
                  introduction = ${introduction},
                  education = ${education},
                  specialization = ${specialization},
                  publications = ${publications},
                  training = ${training},
                  image_url = ${imageUrl}
                WHERE id = ${id}
                RETURNING *;
              `;

              res.status(200).json({ message: "Member updated successfully" });
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: "Error updating member" });
            }
          });
  } else {
    // Method not allowed
    res.status(405).json({ message: "Method not allowed" });
  }
}
