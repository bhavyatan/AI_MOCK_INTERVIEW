import React from "react";

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-800">Support</h1>
        <p className="text-lg text-purple-600 mt-4">
          We're here to help you with any issues or questions you have about
          VirtuView's AI-powered mock interview platform.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-purple-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-8">
          <div className="bg-purple-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-700">1. How do I sign up for VirtuView?</h3>
            <p className="text-purple-500 mt-2">
              To sign up, simply click on the 'Sign Up' button on the homepage. You'll be prompted to enter your basic details such as your name, email, and desired role.
            </p>
          </div>
          <div className="bg-purple-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-700">2. What types of interviews can I practice?</h3>
            <p className="text-purple-500 mt-2">
              VirtuView offers a wide range of mock interview scenarios including technical, behavioral, and case-based interviews. You can select the interview type based on your career goals.
            </p>
          </div>
          <div className="bg-purple-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-700">3. Can I practice as many times as I want?</h3>
            <p className="text-purple-500 mt-2">
              Yes! VirtuView allows you to practice as many mock interviews as you need. You can retry any interview and track your progress over time.
            </p>
          </div>
          <div className="bg-purple-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-700">4. How does the AI mock interview work?</h3>
            <p className="text-purple-500 mt-2">
              Our AI adapts to your answers and provides real-time feedback based on your responses. It simulates an actual interview environment to help you practice and refine your skills.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-purple-800 mb-6">Contact Support</h2>
        <p className="text-lg text-purple-600 mb-4">
          If you can't find the answer to your question, feel free to reach out to our support team. We're always happy to assist you.
        </p>
        <div className="bg-purple-200 shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-700">Email Support</h3>
          <p className="text-purple-500 mt-2">
            You can reach us at <a href="mailto:support@virtuview.com" className="text-purple-600">support@virtuview.com</a>. We typically respond within 24 hours.
          </p>
        </div>
        <div className="bg-purple-200 shadow-lg rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-purple-700">Live Chat</h3>
          <p className="text-purple-500 mt-2">
            Our live chat feature is available 24/7. You can reach us by clicking on the chat icon in the bottom right corner of the page.
          </p>
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-purple-800 mb-6">Troubleshooting</h2>
        <div className="space-y-8">
          <div className="bg-purple-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-700">Issue: Can't Log In</h3>
            <p className="text-purple-500 mt-2">
              If you're having trouble logging in, make sure you're using the correct email and password. If you forgot your password, you can reset it by clicking 'Forgot Password' on the login page.
            </p>
          </div>
          <div className="bg-purple-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-700">Issue: AI Isn't Responding</h3>
            <p className="text-purple-500 mt-2">
              If the AI isn't responding during your mock interview, try refreshing the page or restarting the interview. Ensure that your internet connection is stable.
            </p>
          </div>
          <div className="bg-purple-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-700">Issue: Video/Audio Problems</h3>
            <p className="text-purple-500 mt-2">
              Ensure that your microphone and camera are properly connected and that your browser has the necessary permissions to access them. If the problem persists, try using a different browser.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-purple-500 text-sm">
          &copy; 2025 VirtuView. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SupportPage;
