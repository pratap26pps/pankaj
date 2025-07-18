import React from 'react';
import { useRouter } from 'next/router';
import OTPVerify from '../features/OTPVerify';

const VerifyOtpPage = () => {
  const router = useRouter();
  const { email, mobile } = router.query;

  // You can pass either email or mobile to OTPVerify as per your backend logic
  return <OTPVerify mobile={mobile || ''} onVerifySuccess={() => router.push('/Login')} />;
};

export default VerifyOtpPage;