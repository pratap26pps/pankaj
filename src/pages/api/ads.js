import dbConnect from "@/lib/dbConnect";
import CarouselImage from "@/models/CarouselImage";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { urls } = req.body;

      // Validate input
      if (!urls || (Array.isArray(urls) && urls.length === 0)) {
        return res.status(400).json({ success: false, message: "No image URLs provided" });
      }

      // Normalize to array
      const imageArray = Array.isArray(urls) ? urls : [urls];

      const newImage = new CarouselImage({
        imageUrl: imageArray,
      });

      await newImage.save();

      res.status(201).json({ success: true, imageUrl: imageArray });
    } catch (err) {
      console.error("MongoDB save error:", err);
      res.status(500).json({ success: false, message: "Database save error" });
    }
  } else if (req.method === "GET") {
    try {
      const allAds = await CarouselImage.find().sort({ uploadedAt: -1 });
      return res.status(200).json({ ads: allAds });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Failed to fetch ads" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
