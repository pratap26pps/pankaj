import connectDB from '@/lib/dbConnect';
import users from '@/models/users';

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {

    await connectDB();
    const searchedRole = req.query.role;
    const user = await users.find({role : searchedRole}, '-password');  
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
} 