import connectDB from '@/lib/dbConnect';
import Order from '@/models/Order';
 

function padOrderNumber(num) {
  return num.toString().padStart(11, '0');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { user, items, totalAmount, shippingAddress, paymentMethod } = req.body;
  
  // Validate required fields
  if (!user || !items || !totalAmount || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Validate items array
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items must be a non-empty array' });
  }
  
  try {
    await connectDB();
    
    // Process and validate each item
    const processedItems = items.map((item, index) => {
      // Basic validation for each item
      if (!item.product || !item.quantity || !item.price) {
        throw new Error(`Item at index ${index} is missing required fields (product, quantity, price)`);
      }
      
      // Create processed item with all available fields
      const processedItem = {
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        // Service package specific fields
        ...(item.packageId && { packageId: item.packageId }),
        ...(item.packageName && { packageName: item.packageName }),
        ...(item.selectedProblems && { selectedProblems: item.selectedProblems }),
        ...(item.carBrand && { carBrand: item.carBrand }),
        ...(item.carModel && { carModel: item.carModel }),
        ...(item.warranty && { warranty: item.warranty }),
        ...(item.duration && { duration: item.duration }),
        ...(item.serviceSlug && { serviceSlug: item.serviceSlug }),
      };
      
      return processedItem;
    });
    
    // Get the current order count for unique orderId
    const orderCount = await Order.countDocuments();
    const orderId = `ORDEROXID${padOrderNumber(orderCount + 1)}`;
    
    // Create order with processed items
    const orderData = {
      user,
      items: processedItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderId,
      // Add timestamp
      createdAt: new Date(),
      // Add order status
      status: 'pending'
    };
    
    const newOrder = await Order.create(orderData);
    
    // Log successful order creation with details
    console.log(`Order created successfully: ${orderId}`, {
      userId: user,
      itemCount: processedItems.length,
      totalAmount,
      hasServicePackages: processedItems.some(item => item.packageId)
    });
    
 
    res.status(201).json({ 
      message: 'Order placed successfully', 
      order: newOrder, 
      orderId,
      itemCount: processedItems.length
    });
    
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ 
      message: 'Failed to place order', 
      error: error.message 
    });
  }
} 