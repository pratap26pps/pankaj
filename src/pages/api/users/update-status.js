import dbConnect from "../../../lib/dbConnect";
import users from "../../../models/users";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();
    
    const { userId, status } = req.body;
    
    // Validate input
    if (!userId || !status) {
      return res.status(400).json({ message: "User ID and status are required" });
    }
    
    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be Approved, Rejected, or Pending" });
    }
    
    // Update user status
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ 
      message: `User status updated to ${status}`,
      user: {
        id: updatedUser._id,
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        email: updatedUser.email,
        accountType: updatedUser.accountType,
        status: updatedUser.status
      }
    });
    
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
