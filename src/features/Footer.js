'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  Typography,
  Row,
  Col,
  Space,
  Divider,
  Button
} from 'antd';
import {
  ThunderboltOutlined,
  CarOutlined,
  EnvironmentOutlined,
  SafetyOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  AndroidOutlined,
  AppleOutlined,
  GlobalOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  HeartOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

const { Title, Paragraph, Text } = Typography;

const Footer = () => {
  const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna',
  
  ];

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <footer className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Beautiful Background Elements
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-200/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-200/20 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-lime-200/15 rounded-full blur-2xl" />
        </div> */}

        {/* Decorative Wave Pattern */}
        <div className="absolute top-0 left-0 w-full h-20 " />

        <div className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Section with App Download */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Title
                level={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-700 mb-6"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}
              >
                GridaNeo Bharat
              </Title>
              <div className="w-32 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto mb-8" />

              <Paragraph className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                Leading the future of electric vehicle services with innovative solutions and exceptional customer care.
              </Paragraph>

              {/* App Download & Social Section */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-100">
                <Row gutter={[48, 32]} align="middle" justify="center">
                  <Col xs={24} lg={8}>
                    <div className="flex items-center justify-center">
                      <img
                        src="/images/logo (3).png"
                        alt="Company Logo"
                        width={150}
                        height={200}
                      />
                    </div>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Title level={3} className="text-2xl font-bold text-emerald-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Download Our App
                    </Title>
                    <Paragraph className="text-gray-600 text-lg mb-6">
                      Experience seamless EV service booking
                    </Paragraph>
                    <Space size="large" wrap className="justify-center">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="large"
                          className="h-16 px-8 bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                          icon={<AndroidOutlined className="text-2xl" />}
                        >
                          Google Play
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="large"
                          className="h-16 px-8 bg-gradient-to-r from-gray-800 to-gray-600 text-white border-none rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                          icon={<AppleOutlined className="text-2xl" />}
                        >
                          App Store
                        </Button>
                      </motion.div>
                    </Space>
                  </Col>


                  <Col xs={24} lg={8}>
                    <Title level={4} className="text-emerald-700 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Follow Us
                    </Title>
                    <Space size="large" wrap className="justify-center">
                      {[
                        { icon: <FacebookOutlined />, link: 'https://facebook.com' },
                        { icon: <InstagramOutlined />, link: 'https://instagram.com' },
                        { icon: <TwitterOutlined />, link: 'https://twitter.com' },
                        { icon: <LinkedinOutlined />, link: 'https://linkedin.com' },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.3, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 text-xl"
                       
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </Space>
                  </Col>
                </Row>
              </div>
            </motion.div>

            {/* Main Footer Content - Single Unified Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-100"
            >
              <Row gutter={[48, 48]}>
                {/* Company Info */}
                <Col xs={24} sm={12} lg={6}>
                  <div className="text-center lg:text-left">
                    <Title
                      level={3}
                      className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <TeamOutlined className="text-3xl text-emerald-500" />
                      Company
                    </Title>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-6 mx-auto lg:mx-0" />
                    <Space direction="vertical" size="middle" className="w-full">
                      {[
                        { label: 'About Us', href: '/About' },
                        { label: 'Our Services', href: '/Servicepage' },
                        { label: 'Blog', href: '/Blog' },
                        { label: 'Careers', href: '/' },
                        { label: 'Contact', href: '/' }
                      ].map((link, index) => (
                        <Link key={index} href={link.href}>
                          <motion.div
                            whileHover={{ x: 5, color: '#059669' }}
                            className="text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-medium text-lg"
                          >
                            {link.label}
                          </motion.div>
                        </Link>
                      ))}
                    </Space>
                  </div>
                </Col>

                {/* Services */}
                <Col xs={24} sm={12} lg={6}>
                  <div className="text-center lg:text-left">
                    <Title
                      level={3}
                      className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <CustomerServiceOutlined className="text-3xl text-green-500" />
                      Services
                    </Title>
                    <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 mx-auto lg:mx-0" />
                    <Space direction="vertical" size="middle" className="w-full">
                      {[
                        { label: 'Battery Service', icon: <ThunderboltOutlined /> },
                        { label: 'Motor Repair', icon: <CarOutlined /> },
                        { label: 'Charging Solutions', icon: <SafetyOutlined /> },
                        { label: 'Maintenance', icon: <EnvironmentOutlined /> },
                        { label: 'Emergency Support', icon: <PhoneOutlined /> }
                      ].map((service, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 5 }}
                          className="flex items-center justify-center lg:justify-start gap-3 text-gray-700 hover:text-green-600 transition-colors duration-300 cursor-pointer"
                        >
                          <span className="text-green-500 text-xl">{service.icon}</span>
                          <span className="font-medium text-lg">{service.label}</span>
                        </motion.div>
                      ))}
                    </Space>
                  </div>
                </Col>

                {/* Contact Info */}
                <Col xs={24} sm={12} lg={6}>
                  <div className="text-center lg:text-left">
                    <Title
                      level={3}
                      className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <GlobalOutlined className="text-3xl text-teal-500" />
                      Reach Us
                    </Title>
                    <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6 mx-auto lg:mx-0" />
                    <Space direction="vertical" size="large" className="w-full">
                      <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-700">
                        <PhoneOutlined className="text-emerald-500 text-xl" />
                        <span className="font-semibold text-lg">+91 7982737801</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-700">
                        <MailOutlined className="text-green-500 text-xl" />
                        <span className="font-semibold text-lg">support@gridaneobharat.com</span>
                      </div>
                      <div className="flex items-start justify-center lg:justify-start gap-4 text-gray-700">
                        <EnvironmentOutlined className="text-teal-500 text-xl mt-1" />
                        <span className="font-semibold text-lg">Safdarjung Enclave, New Delhi</span>
                      </div>
                    </Space>
                  </div>
                </Col>

                {/* Cities Coverage */}
                <Col xs={24} sm={12} lg={6}>
                  <div className="text-center lg:text-left">
                    <Title
                      level={3}
                      className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <EnvironmentOutlined className="text-3xl text-lime-500" />
                      Coverage
                    </Title>
                    <div className="w-16 h-1 bg-gradient-to-r from-lime-500 to-green-500 rounded-full mb-6 mx-auto lg:mx-0" />

                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                      <Text className="text-lg font-bold text-emerald-700 mb-4 block">
                        Available in {cities.length}+ cities across India
                      </Text>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {cities.slice(0, 8).map((city, index) => (
                          <motion.span
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-sm font-semibold text-emerald-700 rounded-full border border-emerald-200 hover:shadow-md transition-all duration-300"
                          >
                            {city}
                          </motion.span>
                        ))}
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 text-sm font-bold text-teal-700 rounded-full border border-teal-200 hover:shadow-md transition-all duration-300"
                        >
                          +{cities.length - 8} more cities
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <Row justify="space-between" align="middle">
                <Col xs={24} md={12}>
                  <Text className="text-gray-600 font-medium">
                    © 2025 GridaNeo Bharat. All rights reserved.
                  </Text>
                </Col>
                <Col xs={24} md={12} className="text-right mt-4 md:mt-0">
                  <Space size="large">
                    <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                      Terms of Service
                    </Link>
                    <Link href="/sitemap" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                      Sitemap
                    </Link>
                  </Space>
                </Col>
              </Row>
            </motion.div>

          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
