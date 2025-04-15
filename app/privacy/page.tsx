// app/privacy/page.tsx

import React from 'react';
import Layout from '@/components/Layout';  // Importing the layout

const PrivacyPage = () => {
  return (
    
    <div className="py-10 px-6 md:px-12 lg:px-24 border border-gray-200 rounded-md shadow-md bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      
        {/* Privacy Policy Content */}
        <p className="mb-4 text-gray-700">
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from [Your Website Name] (the "Site").
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Information We Collect</h2>
        <p className="mb-4 text-gray-700">
          We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your mailing address</li>
          <li>Your phone number</li>
          <li>Your payment information (processed securely by third-party providers)</li>
          <li>Your IP address</li>
          <li>Information about your device and browser</li>
          <li>Cookies and usage data</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">How We Use Your Information</h2>
        <p className="mb-4 text-gray-700">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders and our services</li>
          <li>Send you newsletters and marketing communications (if you have opted in)</li>
          <li>Improve our website and services</li>
          <li>Prevent fraud and ensure security</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Sharing Your Information</h2>
        <p className="mb-4 text-gray-700">
          We may share your personal information with third-party service providers who help us operate our website, process payments, send emails, or provide other services. These third parties are contractually obligated to protect your information.
        </p>
        <p className="mb-4 text-gray-700">
          We may also share your information if required by law or to protect our rights and safety.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Your Rights</h2>
        <p className="mb-4 text-gray-700">
          You have the right to access, correct, or delete your personal information. You can also opt out of receiving marketing communications at any time. Please contact us if you wish to exercise these rights.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Data Security</h2>
        <p className="mb-4 text-gray-700">
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Changes to This Privacy Policy</h2>
        <p className="mb-4 text-gray-700">
          We may update our Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at acme-sales@acme.com.
        </p>
      
      </div>
    
  );
};

export default PrivacyPage;

