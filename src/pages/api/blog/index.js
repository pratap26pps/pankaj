import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/blogSchema";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { 
        page = 1, 
        limit = 10, 
        category, 
        author, 
        authorRole,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Build query filter
      const filter = {};
      
      if (category) {
        filter.category = { $regex: category, $options: 'i' };
      }
      
      if (author) {
        filter.author = { $regex: author, $options: 'i' };
      }
      
      if (authorRole) {
        filter.authorRole = authorRole;
      }
      
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Build sort object
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Fetch blogs with pagination and sorting
      const blogs = await Blog.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'); // Exclude version field

      // Get total count for pagination
      const totalCount = await Blog.countDocuments(filter);

      // Get unique categories and authors for filtering
      const categories = await Blog.distinct('category');
      const authors = await Blog.distinct('author');

      res.status(200).json({
        success: true,
        data: blogs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / parseInt(limit)),
          totalCount,
          hasNext: skip + blogs.length < totalCount,
          hasPrev: parseInt(page) > 1,
          limit: parseInt(limit)
        },
        filters: {
          categories,
          authors
        }
      });

    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blogs',
        error: error.message
      });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const blogData = req.body;
      
      // Validate required fields
      const requiredFields = ['title', 'excerpt', 'content', 'category', 'author'];
      for (const field of requiredFields) {
        if (!blogData[field]) {
          return res.status(400).json({
            success: false,
            message: `${field} is required`
          });
        }
      }

      // Create new blog
      const newBlog = new Blog(blogData);
      const savedBlog = await newBlog.save();

      res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: savedBlog
      });

    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create blog',
        error: error.message
      });
    }
    return;
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`
  });
}
