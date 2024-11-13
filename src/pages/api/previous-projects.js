import multer from "multer";
import { neon } from "@neondatabase/serverless";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const sql = neon(process.env.DATABASE_URL);

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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  upload(req, res, async (err) => {
    if (err) {
      console.error("Файл ачаалах алдаа:", err);
      return res
        .status(400)
        .json({ message: "Файл ачаалах алдаа", error: err.message });
    }
    if (req.method === "GET") {
      try {
        const data = await sql`SELECT * FROM previous_projects`;
        if (data.length === 0) {
          return res.status(200).send("empty");
        }
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving members" });
      }
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
        return res
          .status(400)
          .json({ message: "Бүх талбаруудыг бөглөх шаардлагатай" });
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
          .json({ message: "Төсөл амжилттай үүслээ", data: query });
      } catch (error) {
        console.error("Төсөл үүсгэх алдаа:", error);
        return res.status(500).json({ message: "Төсөл үүсгэх алдаа", error });
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
      } = req.body;

      try {
        const project =
          await sql`SELECT * FROM previous_projects WHERE id = ${id} LIMIT 1`;

        if (project.length === 0) {
          return res.status(404).json({ message: "Төсөл олдсонгүй" });
        }

        let imageUrl = project[0].image_url;

        if (req.file) {
          if (imageUrl) {
            await deleteFile(imageUrl);
          }
          imageUrl = await uploadFile(req.file);
        }

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

        return res
          .status(200)
          .json({ message: "Төсөл амжилттай шинэчлэгдлээ" });
      } catch (error) {
        console.error("Төсөл шинэчлэх алдаа:", error);
        return res.status(500).json({ message: "Төсөл шинэчлэх алдаа", error });
      }
    }

    if (req.method === "DELETE" && id) {
      try {
        const project =
          await sql`SELECT * FROM previous_projects WHERE id = ${id} LIMIT 1`;

        if (project.length === 0) {
          return res.status(404).json({ message: "Төсөл олдсонгүй" });
        }

        const imageUrl = project[0].image_url;
        if (imageUrl) {
          await deleteFile(imageUrl);
        }

        await sql`DELETE FROM previous_projects WHERE id = ${id}`;
        return res.status(200).json({ message: "Төсөл амжилттай устгагдлаа" });
      } catch (error) {
        console.error("Төсөл устгах алдаа:", error);
        return res.status(500).json({ message: "Төсөл устгах алдаа", error });
      }
    }

    return res.status(405).json({ message: "Метод зөвшөөрөгдөхгүй" });
  });
}
