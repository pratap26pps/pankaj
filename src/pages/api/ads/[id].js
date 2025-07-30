import dbConnect from "@/lib/dbConnect";
import CarouselImage from "@/models/CarouselImage";

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "DELETE":
      try {
        const deletedAd = await CarouselImage.findByIdAndDelete(id);
        if (!deletedAd) {
          return res.status(404).json({ success: false, message: "Ad not found" });
        }
        return res.status(200).json({ success: true, message: "Ad deleted" });
      } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ success: false, message: "Failed to delete ad" });
      }

    default:
      res.setHeader("Allow", ["DELETE"]);
      return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
