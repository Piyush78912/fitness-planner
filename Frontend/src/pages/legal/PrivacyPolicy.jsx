import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center mb-4">Privacy Policy</h1>
          
          <div className="card shadow">
            <div className="card-body p-4 p-md-5">
              <section className="mb-5">
                <h2 className="h3 mb-3">Introduction</h2>
                <p>
                  At FitPlanner, we take your privacy seriously. This Privacy Policy describes how we collect, use, 
                  and share information about you when you use our website, mobile application, and services.
                </p>
                <p>
                  By using FitPlanner, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Information We Collect</h2>
                <p>We collect several types of information from and about users of our platform, including:</p>
                
                <h3 className="h5 mt-4 mb-2">Personal Information</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Name and contact information (email address, phone number)</li>
                  <li className="list-group-item">Account credentials</li>
                  <li className="list-group-item">Profile information (age, height, weight, fitness goals)</li>
                  <li className="list-group-item">Payment information when you subscribe to premium features</li>
                </ul>
                
                <h3 className="h5 mt-4 mb-2">Health and Fitness Data</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Workout history and performance</li>
                  <li className="list-group-item">Exercise preferences</li>
                  <li className="list-group-item">Health metrics you choose to track</li>
                </ul>
                
                <h3 className="h5 mt-4 mb-2">Usage Information</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">How you interact with our application</li>
                  <li className="list-group-item">Features you use</li>
                  <li className="list-group-item">Device information and identifiers</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Provide, maintain, and improve our services</li>
                  <li className="list-group-item">Personalize your experience and deliver content relevant to your interests</li>
                  <li className="list-group-item">Process transactions and send related information</li>
                  <li className="list-group-item">Send notifications related to your account or activity</li>
                  <li className="list-group-item">Monitor and analyze usage patterns and trends</li>
                  <li className="list-group-item">Protect against, identify, and prevent fraud and other illegal activities</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Sharing Your Information</h2>
                <p>We may share your information with:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Service providers who perform services on our behalf</li>
                  <li className="list-group-item">Other users, when you explicitly choose to share your activity or connect with them</li>
                  <li className="list-group-item">Business partners, with your consent</li>
                  <li className="list-group-item">In response to legal requirements or to protect our rights</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Your Choices</h2>
                <p>You can manage your information and privacy preferences by:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Updating your account settings</li>
                  <li className="list-group-item">Adjusting notification preferences</li>
                  <li className="list-group-item">Choosing what information to share publicly on your profile</li>
                  <li className="list-group-item">Requesting access to or deletion of your personal data</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information from unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
                  storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Changes to This Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="h3 mb-3">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at privacy@fitplanner.com.
                </p>
                <p className="text-muted mt-4 small">Last Updated: April 24, 2025</p>
              </section>
              
              <div className="text-center mt-5">
                <Link to="/" className="btn btn-primary">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;