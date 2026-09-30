import Layout from "../components/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-2)', marginBottom: '16px' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>Information Collection</h2>
        <p style={{ color: 'var(--text-2)', marginBottom: '16px', lineHeight: '1.6' }}>
          We collect information that you provide directly to us, including your code snippets, translation requests, and account details.
        </p>

        <h2 style={{ fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>How We Use Information</h2>
        <p style={{ color: 'var(--text-2)', marginBottom: '16px', lineHeight: '1.6' }}>
          We use the information we collect to provide, maintain, and improve our services, to process your code translations, and to personalize your experience.
        </p>
        
        <h2 style={{ fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>Code Privacy</h2>
        <p style={{ color: 'var(--text-2)', marginBottom: '16px', lineHeight: '1.6' }}>
          Your code snippets are private by default. They are stored securely and only accessible to you unless you explicitly choose to share them via a public link.
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
