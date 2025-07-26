"use client";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function OrderHistory() {
  const { orders } = useSelector((state) => state.order);
  console.log("orders", orders);
  const user = useSelector((state) => state.auth.user);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackOrder, setTrackOrder] = useState(null);

  return (
    <div className="text-black">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-black">My Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {["Order ID", "Product", "Amount", "Status", "Date", "Actions"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-black">
                    {order.orderId || order._id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {order.items && order.items.length > 0
                    ? order.items
                        .map((item) => item.product?.name || "")
                        .join(", ")
                    : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold text-black">
                    ₹{order.totalAmount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 text-black rounded-full text-xs font-medium border">
                    {order.status?.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    {/* View Dialog */}
                    <Dialog
                      open={selectedOrder?._id === order._id}
                      onOpenChange={(open) =>
                        setSelectedOrder(open ? order : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-400 text-blue-700"
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md border border-blue-100 bg-green-50 rounded-xl shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-blue-700">
                            Order Details
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 text-black">
                          <div>
                            <b>Order ID:</b> {order.orderId || order._id}
                          </div>
                          <div>
                            <b>Status:</b> {order.status}
                          </div>
                          <div>
                            <b>Total:</b> ₹{order.totalAmount}
                          </div>
                          <div>
                            <b>Date:</b>{" "}
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleString()
                              : ""}
                          </div>
                          <div>
                            <b>Shipping Address:</b>{" "}
                            {order.shippingAddress?.address},{" "}
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.country} -{" "}
                            {order.shippingAddress?.postalCode}
                          </div>
                          <div className="mt-4">
                            <span className="font-semibold">Products:</span>
                            <ul className="mt-2 space-y-2">
                              {order.items?.map((item, idx) => (
                                <li
                                  key={item._id || idx}
                                  className="flex items-center gap-3 border-b pb-2 last:border-b-0"
                                >
                                  {item.product?.images?.[0] && (
                                    <img
                                      src={item.product.images[0]}
                                      alt={item.product.name}
                                      className="w-10 h-10 object-cover rounded border"
                                    />
                                  )}
                                  <div>
                                    <div className="font-semibold">
                                      {item.product?.name}
                                    </div>
                                    <div className="text-xs text-gray-700">
                                      Qty: {item.quantity} | Price: ₹
                                      {item.price}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Track Order Dialog */}
                    <Dialog
                      open={trackOrder?._id === order._id}
                      onOpenChange={(open) =>
                        setTrackOrder(open ? order : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-400 text-green-700"
                        >
                          Track Order
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md border border-green-100 bg-green-50 rounded-xl shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-green-700">
                            Track Order
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 text-black">
                          <div>
                            <b>Address:</b>{" "}
                            {order.shippingAddress?.address},{" "}
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.country} -{" "}
                            {order.shippingAddress?.postalCode}
                          </div>
                          <div>
                            <b>Status:</b> {order.status}
                          </div>
                          <div>
                            <b>Date:</b>{" "}
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleString()
                              : ""}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

OrderHistory.requiredRole = "customer";
