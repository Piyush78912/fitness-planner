import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center mb-4">Terms of Service</h1>
          
          <div className="card shadow">
            <div className="card-body p-4 p-md-5">
              <section className="mb-5">
                <h2 className="h3 mb-3">Agreement to Terms</h2>
                <p>
                  By accessing or using the FitPlanner application and services, you agree to be bound by these Terms of Service. 
                  If you disagree with any part of these terms, you may not access or use our services.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Use of Services</h2>
                <p>
                  FitPlanner provides a platform for creating, tracking, and sharing fitness plans and progress. Our services 
                  are designed to help you achieve your fitness goals, but are not intended to replace professional fitness or medical advice.
                </p>
                <p>
                  You are responsible for determining whether the exercises and workouts provided through our services are appropriate 
                  for your level of fitness and health status. We recommend consulting with a healthcare professional before starting 
                  any new fitness program, especially if you have pre-existing health conditions.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">User Accounts</h2>
                <p>When creating an account with FitPlanner, you agree to:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Provide accurate, current, and complete information</li>
                  <li className="list-group-item">Maintain and promptly update your account information</li>
                  <li className="list-group-item">Keep your password secure and confidential</li>
                  <li className="list-group-item">Be responsible for all activities that occur under your account</li>
                  <li className="list-group-item">Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">User Content</h2>
                <p>
                  Our platform allows you to post, link, store, share, and otherwise make available certain information, text, 
                  graphics, videos, or other material. You are responsible for the content you post and share.
                </p>
                <p>By posting content on FitPlanner, you:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Grant us the right to use, modify, perform, display, reproduce, and distribute such content on our platform</li>
                  <li className="list-group-item">Represent that you own or have the necessary permissions to use and authorize us to use the content</li>
                  <li className="list-group-item">Agree not to post content that violates the rights of any third party</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Prohibited Activities</h2>
                <p>You agree not to use our services to:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Violate any applicable laws or regulations</li>
                  <li className="list-group-item">Impersonate any person or entity</li>
                  <li className="list-group-item">Harass, abuse, or harm another person</li>
                  <li className="list-group-item">Send spam or other unsolicited messages</li>
                  <li className="list-group-item">Interfere with or disrupt the services or servers connected to the services</li>
                  <li className="list-group-item">Attempt to gain unauthorized access to any parts of the services</li>
                  <li className="list-group-item">Use the services for any commercial purposes without our prior written consent</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Subscription and Payments</h2>
                <p>
                  Some features of FitPlanner may require a subscription. By subscribing to our premium services, you agree to pay 
                  the fees indicated for your selected subscription plan.
                </p>
                <p>
                  Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period. 
                  You can manage and cancel subscriptions through your account settings.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Intellectual Property</h2>
                <p>
                  The FitPlanner application, including all content, features, and functionality, is owned by FitPlanner, 
                  its licensors, or other providers and is protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not copy, modify, create derivative works from, publicly display, publicly perform, republish, download, 
                  store, transmit, or exploit any of the material on our platform, except as explicitly allowed by these Terms of Service.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Disclaimer of Warranties</h2>
                <p>
                  Our services are provided on an "as is" and "as available" basis. FitPlanner makes no warranties, expressed or implied, 
                  regarding the operation of our services or the information content or materials included on our platform.
                </p>
                <p>
                  We do not guarantee that our services will be uninterrupted, secure, or error-free, or that defects will be corrected.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, FitPlanner shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising from or related to your use of our services.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h3 mb-3">Changes to Terms</h2>
                <p>
                  We may revise these Terms of Service at any time without notice. By continuing to use our platform after those 
                  revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section>
                <h2 className="h3 mb-3">Contact Us</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at legal@fitplanner.com.
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

export default TermsOfService;