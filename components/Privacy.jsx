import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen  text-slate-800 px-10 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy & Security</h1>

      <section className="prose flex flex-col gap-5 max-w-3xl">
        <div>
            <h2 className="label">Data Collected</h2>
        <ul className="text-sm">
          <li>Account information: name, email address, profile picture.</li>
          <li>Usage data: preferences, interactions with the application.</li>
          <li>Files or images you choose to upload.</li>

        </ul>
        </div>
        
    <div>
        <h2 className="label">Use of Data</h2>
        <ul className="text-sm">
          <li>Provide and improve our services.</li>
          <li>Personalize your experience.</li>
          <li>Communicate with you (notifications, updates).</li>

        </ul>
    </div>
        
<div>
    <h2 className="label">Storage and Security</h2>
        <ul className="text-sm">
          <li>Data stored in a secure database.</li>
          <li>Encrypted transmission via HTTPS.</li>
          <li>Access limited to authorized personnel only.</li>

        </ul>
</div>
        
<div>
    <h2 className="label">Sharing with Third Parties</h2>
        <ul className="text-sm">
          <li>Some external services (hosting, Cloudinary, etc.) may process your data.</li>
          <li>We only choose providers that comply with security standards.</li>
        </ul>
</div>
        
<div>
    <h2 className="label">Your Rights</h2>
        <ul className="text-sm">
          <li>Access your data.</li>
          <li>Edit or delete your information.</li>
          <li>Withdraw your consent at any time.</li>

        </ul>
</div>
        
<div>
    <h2 className="label">Cookies and Tracking</h2>
        <ul className="text-sm">
          <li>Use of cookies for session and personalization.</li>
          <li>You can manage your preferences in your browser settings.</li>

        </ul>
</div>
        
<div>
    <h2 className="label">Legal Compliance</h2>
        <p className="text-sm">
          We comply with GDPR and local data protection laws.

        </p>
</div>
        

        <hr className="my-6" />

        <p>
          For any questions, please contact our support team via the
          <strong> Help </strong> section of the application.

        </p>
      </section>
    </div>
  );
}