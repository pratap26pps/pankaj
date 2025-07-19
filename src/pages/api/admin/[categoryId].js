import dbConnect from '../../../lib/dbConnect';
import Category from '../../../models/Category';
import Product from '@/src/models/Product';

export default async function handler(req, res) {
  await dbConnect();
  const { categoryId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { name, description, catImage, categoryType } = req.body;
      if (!name || !categoryType) {
        return res.status(400).json({ success: false, message: 'Name and categoryType are required' });
      }
      const updated = await Category.findByIdAndUpdate(
        categoryId,
        { name, description, catImage, categoryType },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      return res.status(200).json({ success: true, category: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await Product.deleteMany({ category: categoryId });
      const deleted = await Category.findByIdAndDelete(categoryId);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
} 