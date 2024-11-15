import multer from "multer";
import { neon } from "@neondatabase/serverless";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const sql = neon(process.env.DATABASE_URL);

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("image");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFile = async (file) => {
  const fileName = `${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `projects/${fileName}`,
    Body: file.buffer,
    ACL: "public-read",
  };

  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response.Location;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Error uploading to S3");
  }
};

const deleteFile = async (imageUrl) => {
  const fileName = imageUrl.split("/").pop();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `projects/${fileName}`,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("Error deleting file from S3");
  }
};

// Disable Next.js bodyParser for this API to allow Multer to work
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      // Handle GET request without file upload middleware
      const data = await sql`SELECT * FROM previous_projects`;

      if (data.length === 0) {
        return res.status(200).send("empty");
      }

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving projects" });
    }
    return; // Exit after GET request is handled
  }

  // Use the upload middleware only for POST, PUT, DELETE methods
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }

    if (req.method === "POST") {
      const {
        project_name,
        brief_description,
        issues,
        work_progress,
        results,
        statistics,
        project_date,
      } = req.body;

      if (!project_name || !brief_description || !req.file || !project_date) {
        return res.status(400).json({ message: "All fields are required" });
      }

      try {
        const imageUrl = await uploadFile(req.file);
        const query = await sql`
          INSERT INTO previous_projects (id, project_name, brief_description, issues, work_progress, results, statistics, image_url, project_date)
          VALUES (${uuidv4()}, ${project_name}, ${brief_description}, ${issues}, ${work_progress}, ${results}, ${statistics}, ${imageUrl}, ${project_date})
          RETURNING *;
        `;

        return res
          .status(201)
          .json({ message: "Project created successfully", data: query });
      } catch (error) {
        console.error("Error creating project:", error);
        return res
          .status(500)
          .json({ message: "Error creating project", error });
      }
    }

  if (req.method === "PUT" && id) {
    const {
      project_name,
      brief_description,
      issues,
      work_progress,
      results,
      statistics,
      project_date,
    } = req.body; // Destructure the form data

    try {
      // Find the existing project by ID
      const project = await sql`SELECT * FROM previous_projects WHERE id = ${id} LIMIT 1`;

      if (project.length === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      let imageUrl = project[0].image_url; // Get the current image URL if available

      // Handle file upload if a file was uploaded
      if (req.file) {
        if (imageUrl) {
          // Delete the old image if there was one
          await deleteFile(imageUrl);
        }
        // Upload the new file and get the new image URL
        imageUrl = await uploadFile(req.file);
      }

      // Update the project in the database
      await sql`
        UPDATE previous_projects
        SET
          project_name = ${project_name},
          brief_description = ${brief_description},
          issues = ${issues},
          work_progress = ${work_progress},
          results = ${results},
          statistics = ${statistics},
          image_url = ${imageUrl},
          project_date = ${project_date}
        WHERE id = ${id}
        RETURNING *;
      `;

      return res.status(200).json({ message: "Project updated successfully" });
    } catch (error) {
      console.error("Error updating project:", error);
      return res.status(500).json({ message: "Error updating project", error });
    }
  }

    if (req.method === "DELETE" && id) {
      try {
        const project =
          await sql`SELECT * FROM previous_projects WHERE id = ${id} LIMIT 1`;

        if (project.length === 0) {
          return res.status(404).json({ message: "Project not found" });
        }

        const imageUrl = project[0].image_url;
        if (imageUrl) {
          await deleteFile(imageUrl);
        }

        await sql`DELETE FROM previous_projects WHERE id = ${id}`;
        return res
          .status(200)
          .json({ message: "Project deleted successfully" });
      } catch (error) {
        console.error("Error deleting project:", error);
        return res
          .status(500)
          .json({ message: "Error deleting project", error });
      }
    }

    return res.status(405).json({ message: "Method not allowed" });
  });
}
