// pages/api/blogs/add.js
import dbConnect from "@/lib/dbConnect";  
import Blog from "@/models/blogSchema";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const blog = await Blog.create(req.body);
      res.status(201).json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
