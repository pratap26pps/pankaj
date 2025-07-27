import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { FaTimes, FaTrash } from "react-icons/fa";

const BlogForm = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    tags: "",
    author: "",
    authorRole: "admin",
    authorAvatar: "",
    readTime: "5 min read",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [blogs, setBlogs] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.excerpt.trim()) newErrors.excerpt = "Excerpt is required.";
    if (!form.content.trim()) newErrors.content = "Content is required.";
    if (!form.image.trim()) newErrors.image = "Image is required.";
    if (!form.category.trim()) newErrors.category = "Category is required.";
    if (!form.author.trim()) newErrors.author = "Author name is required.";
    if (form.image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(form.image)) {
      newErrors.image = "Enter a valid image URL (jpg, png, webp, gif).";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
      setImagePreview(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const tagsArray = form.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      const response = await fetch("/api/blog/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags: tagsArray }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Blog added successfully!");
        setBlogs([
          {
            ...form,
            tags: tagsArray,
            id: Date.now(),
            image: form.image,
          },
          ...blogs,
        ]);
        setForm({
          title: "",
          excerpt: "",
          content: "",
          image: "",
          category: "",
          tags: "",
          author: "",
          authorRole: "admin",
          authorAvatar: "",
          readTime: "5 min read",
        });
        setImagePreview("");
        setErrors({});
      } else {
        toast.error(data.error || "Failed to add blog.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Remove a blog from the list
  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <motion.div
      className="w-full max-w-xl mx-auto bg-white shadow-lg mt-10 rounded-2xl p-4 md:p-6 border border-gray-100 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold z-10"
          aria-label="Close"
        >
          <FaTimes />
        </button>
      )}
      <h2 className="text-xl font-bold mb-4 text-emerald-700 flex items-center gap-2">
        <span>Add New Blog</span>
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        autoComplete="off"
      >
        {/* Title */}
        <div>
          <label className="block font-medium text-xs text-gray-700 mb-1">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Blog title"
            className={`w-full px-2 py-1 text-xs rounded-lg border ${errors.title ? 'border-red-400' : 'border-gray-300'} focus:ring-emerald-400 focus:border-emerald-400`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-0.5">{errors.title}</p>}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-medium text-xs text-gray-700 mb-1">Excerpt *</label>
          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Short summary"
            className={`w-full px-2 py-1 text-xs rounded-lg border ${errors.excerpt ? 'border-red-400' : 'border-gray-300'} focus:ring-blue-400 focus:border-blue-400`}
          />
          {errors.excerpt && <p className="text-xs text-red-500 mt-0.5">{errors.excerpt}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-xs text-gray-700 mb-1">Category *</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className={`w-full px-2 py-1 text-xs rounded-lg border ${errors.category ? 'border-red-400' : 'border-gray-300'} focus:ring-blue-400 focus:border-blue-400`}
          />
          {errors.category && <p className="text-xs text-red-500 mt-0.5">{errors.category}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium text-xs text-gray-700 mb-1">Tags</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="comma separated"
            className="w-full px-2 py-1 text-xs rounded-lg border border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium text-xs text-gray-700 mb-1">Author *</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Your name"
            className={`w-full px-2 py-1 text-xs rounded-lg border ${errors.author ? 'border-red-400' : 'border-gray-300'} focus:ring-blue-400 focus:border-blue-400`}
          />
          {errors.author && <p className="text-xs text-red-500 mt-0.5">{errors.author}</p>}
        </div>

        {/* Avatar */}
        <div>
          <label className="block font-medium text-xs text-gray-700 mb-1">Author Avatar URL</label>
          <input
            name="authorAvatar"
            value={form.authorAvatar}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-2 py-1 text-xs rounded-lg border border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        {/* Read Time */}
        <div>
          <label className="block font-medium text-xs text-gray-700 mb-1">Read Time</label>
          <input
            name="readTime"
            value={form.readTime}
            onChange={handleChange}
            placeholder="e.g. 5 min read"
            className="w-full px-2 py-1 text-xs rounded-lg border border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block font-medium text-xs text-gray-700 mb-1">Image URL *</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://image-url.com"
            className={`w-full px-2 py-1 text-xs rounded-lg border ${errors.image ? 'border-red-400' : 'border-gray-300'} focus:ring-blue-400 focus:border-blue-400`}
          />
          {imagePreview && !errors.image && (
            <img src={imagePreview} alt="Preview" className="mt-2 rounded-md shadow max-h-28 mx-auto" />
          )}
          {errors.image && <p className="text-xs text-red-500 mt-0.5">{errors.image}</p>}
        </div>

        {/* Content */}
        <div className="md:col-span-2">
          <label className="block font-medium text-xs text-gray-700 mb-1">Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows={4}
            className={`w-full px-2 py-1 text-xs rounded-lg border resize-none ${errors.content ? 'border-red-400' : 'border-gray-300'} focus:ring-blue-400 focus:border-blue-400`}
          />
          {errors.content && <p className="text-xs text-red-500 mt-0.5">{errors.content}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-4 text-xs font-semibold rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md hover:from-blue-500 hover:to-green-500 transition-all disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Blog"}
          </button>
        </div>
      </form>

      {/* Blog List */}
      {blogs.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">Created Blogs</h3>
          <div className="flex flex-col gap-3">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-50 rounded-lg shadow p-3 flex items-center gap-4 relative"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-emerald-700 truncate">{blog.title}</div>
                  <div className="text-xs text-gray-500 truncate">{blog.excerpt}</div>
                  <div className="text-xs text-gray-400">By {blog.author} • {blog.readTime}</div>
                </div>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="ml-2 text-red-400 hover:text-red-600 text-lg p-1 rounded transition"
                  aria-label="Delete Blog"
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default BlogForm;
