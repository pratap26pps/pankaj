import dbConnect from "@/lib/dbConnect"; // Ensure you have this connection utility
import blogSchema from "@/models/blogSchema"; // Your schema file

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    // ✅ UPDATE blog post
    case "PUT":
      try {
        const updatedBlog = await blogSchema.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!updatedBlog) {
          return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, data: updatedBlog });
      } catch (error) {
        console.error("PUT Error:", error);
        res.status(400).json({ success: false, message: "Update failed", error });
      }
      break;

    // ✅ DELETE blog post
    case "DELETE":
      try {
        const deletedBlog = await blogSchema.findByIdAndDelete(id);

        if (!deletedBlog) {
          return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog deleted" });
      } catch (error) {
        console.error("DELETE Error:", error);
        res.status(400).json({ success: false, message: "Deletion failed", error });
      }
      break;

    // ❌ Unsupported method
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
