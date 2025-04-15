// app/privacy/page.tsx

import React from 'react';
import Layout from '@/components/Layout';  // Importing the layout

const Terms_Of_Service_Page = () => {
  return (
    
    <div className="py-10 px-6 md:px-12 lg:px-24 border border-gray-200 rounded-md shadow-md bg-white">
        <div className="container mx-auto py-10 px-6 md:px-12 lg:px-24 border border-gray-200 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Terms of Service</h1>

        {/* Your Terms of Service Content Goes Here */}
        <p className="mb-4 text-gray-700">
          Please read these Terms of Service carefully before using Acme.com (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Acceptance of Terms</h2>
        <p className="mb-4 text-gray-700">
          By accessing and using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Use of the Service</h2>
        <p className="mb-4 text-gray-700">
          The Service is provided for your personal and non-commercial use only, unless otherwise expressly agreed upon. You agree to use the Service in accordance with all applicable laws and regulations.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>You will not use the Service for any illegal or unauthorized purpose.</li>
          <li>You will not interfere with or disrupt the operation of the Service.</li>
          <li>You will not attempt to gain unauthorized access to any part of the Service or related systems.</li>
          <li>You will not reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">User Content</h2>
        <p className="mb-4 text-gray-700">
          Users may be permitted to submit, upload, publish, or otherwise make available content, including text, images, and other materials ("User Content"). You retain all rights in, and are solely responsible for, the User Content you make available through the Service.
        </p>
        <p className="mb-4 text-gray-700">
          By making any User Content available through the Service, you grant to [Your Website Name] a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, copy, modify, create derivative works based upon, distribute, publicly display, publicly perform, and otherwise exploit your User Content in connection with operating and providing the Service.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Intellectual Property</h2>
        <p className="mb-4 text-gray-700">
          The Service and its original content, features, and functionality are and will remain the exclusive property of [Your Website Name] and its licensors. The Service is protected by copyright, trademark, and other laws.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Disclaimer of Warranties</h2>
        <p className="mb-4 text-gray-700">
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. [Your Website Name] DISCLAIMS ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Limitation of Liability</h2>
        <p className="mb-4 text-gray-700">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL [Your Website Name] BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES) ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR YOUR INABILITY TO ACCESS OR USE, THE SERVICE.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Governing Law</h2>
        <p className="mb-4 text-gray-700">
          These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Changes to These Terms</h2>
        <p className="mb-4 text-gray-700">
          We may revise these Terms from time to time. The most current version of the Terms will be posted on the Service. By continuing to access or use the Service after those revisions become effective, you agree to be bound by the revised Terms.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about these Terms, please contact us at acme-sales@acme.com.
        </p>
      </div>
    </div>
    
  );
};

export default Terms_Of_Service_Page;

