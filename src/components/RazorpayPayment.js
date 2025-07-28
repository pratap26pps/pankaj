import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle, XCircle, Loader } from 'lucide-react';
import {toast} from 'sonner';

const RazorpayPayment = ({ 
  amount, 
  orderData, 
  onSuccess, 
  onFailure, 
  onClose,
  customerInfo 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, success, failed

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentStatus('processing');

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create order on backend
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          receipt: `order_${Date.now()}`,
          notes: {
            orderId: orderData.orderId,
            customerId: customerInfo.id || customerInfo._id,
            customerName: customerInfo.name,
            customerEmail: customerInfo.email
          }
        }),
      });

      const orderResult = await orderResponse.json();
      
      if (!orderResult.success) {
        throw new Error(orderResult.message || 'Failed to create payment order');
      }

      // Configure Razorpay options
      const options = {
        key: orderResult.data.key_id,
        amount: orderResult.data.amount,
        currency: orderResult.data.currency,
        name: 'GridaNeo Bharat',
        description: 'EV Service Payment',
        order_id: orderResult.data.orderId,
        prefill: {
          name: customerInfo.name || customerInfo.firstName + ' ' + customerInfo.lastName,
          email: customerInfo.email,
          contact: customerInfo.mobile || customerInfo.phone,
        },
        theme: {
          color: '#059669', // Emerald color to match your theme
        },
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/payment/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderData._id || orderData.id,
              }),
            });

            const verifyResult = await verifyResponse.json();
            
            if (verifyResult.success) {
              setPaymentStatus('success');
              toast.success('Payment successful!');
              setTimeout(() => {
                onSuccess({
                  ...response,
                  orderId: orderData._id || orderData.id,
                  amount: amount
                });
              }, 1500);
            } else {
              throw new Error(verifyResult.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setPaymentStatus('failed');
            toast.error('Payment verification failed');
            onFailure(error);
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            setPaymentStatus('pending');
            toast.error('Payment cancelled');
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation error:', error);
      setPaymentStatus('failed');
      setIsProcessing(false);
      toast.error(error.message || 'Failed to initiate payment');
      onFailure(error);
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'processing':
        return <Loader className="w-8 h-8 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'failed':
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return <CreditCard className="w-8 h-8 text-emerald-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'processing':
        return 'Processing your payment...';
      case 'success':
        return 'Payment completed successfully!';
      case 'failed':
        return 'Payment failed. Please try again.';
      default:
        return 'Ready to process your payment';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {paymentStatus === 'success' ? 'Payment Successful' : 'Secure Payment'}
          </h2>
          <p className="text-gray-600">{getStatusMessage()}</p>
        </div>

        {/* Payment Details */}
        {paymentStatus === 'pending' && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Amount to Pay:</span>
              <span className="text-2xl font-bold text-emerald-600">₹{amount}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Order ID:</span>
              <span className="text-sm font-mono text-gray-800">{orderData.orderId}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Secured by Razorpay</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {paymentStatus === 'pending' && (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pay Now
                  </>
                )}
              </button>
            </>
          )}
          
          {paymentStatus === 'success' && (
            <button
              onClick={() => onSuccess({ amount })}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue
            </button>
          )}
          
          {paymentStatus === 'failed' && (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPaymentStatus('pending');
                  setIsProcessing(false);
                }}
                className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>

        {/* Payment Methods Info */}
        {paymentStatus === 'pending' && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Accepted Payment Methods</p>
            <div className="flex justify-center gap-2 text-xs text-gray-400">
              <span>Credit Card</span>
              <span>•</span>
              <span>Debit Card</span>
              <span>•</span>
              <span>UPI</span>
              <span>•</span>
              <span>Net Banking</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RazorpayPayment;
