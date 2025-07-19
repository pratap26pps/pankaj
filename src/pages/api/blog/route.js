import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/Model/User';

// GET - Fetch all blog posts from admin and superadmin
export async function GET() {
  try {
    await connectDB();
    
    // Find all users with role 'admin' or 'superadmin' who have blog posts
    const adminUsers = await User.find({
      role: { $in: ['admin', 'superadmin'] },
      'blogPosts.0': { $exists: true }
    }).select('name email role blogPosts avatar');

    // Flatten all blog posts from admin and superadmin users
    const allBlogPosts = [];
    
    adminUsers.forEach(user => {
      if (user.blogPosts && user.blogPosts.length > 0) {
        user.blogPosts.forEach(post => {
          allBlogPosts.push({
            ...post.toObject(),
            author: user.name,
            authorEmail: user.email,
            authorRole: user.role,
            authorAvatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
          });
        });
      }
    });

    // Sort by creation date (newest first)
    allBlogPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json({
      success: true,
      posts: allBlogPosts,
      totalPosts: allBlogPosts.length
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post (admin/superadmin only)
export async function POST(request) {
  try {
    await connectDB();
    
    const { title, excerpt, content, image, category, tags, authorEmail } = await request.json();

    // Find the user and verify they are admin or superadmin
    const user = await User.findOne({ 
      email: authorEmail,
      role: { $in: ['admin', 'superadmin'] }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Only admin and superadmin can create blog posts' },
        { status: 403 }
      );
    }

    // Create new blog post
    const newPost = {
      title,
      excerpt,
      content,
      image: image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
      category: category || 'General',
      tags: tags || [],
      views: 0,
      likes: 0,
      readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to user's blog posts
    user.blogPosts = user.blogPosts || [];
    user.blogPosts.push(newPost);
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      post: {
        ...newPost,
        author: user.name,
        authorEmail: user.email,
        authorRole: user.role,
        authorAvatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
      }
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post (admin/superadmin only)
export async function DELETE(request) {
  try {
    await connectDB();
    
    const { postId, authorEmail } = await request.json();

    // Find the user and verify they are admin or superadmin
    const user = await User.findOne({ 
      email: authorEmail,
      role: { $in: ['admin', 'superadmin'] }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Only admin and superadmin can delete blog posts' },
        { status: 403 }
      );
    }

    // Remove the blog post
    user.blogPosts = user.blogPosts.filter(post => post._id.toString() !== postId);
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
