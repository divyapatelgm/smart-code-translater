import Layout from "../components/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-2)', marginBottom: '16px' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
        <p style={{ color: 'var(--text-2)', marginBottom: '16px', lineHeight: '1.6' }}>
          By accessing and using SmartCode, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 style={{ fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>2. Use License</h2>
        <p style={{ color: 'var(--text-2)', marginBottom: '16px', lineHeight: '1.6' }}>
          Permission is granted to temporarily use this application for personal or commercial code translation and analysis purposes.
        </p>
        
        <h2 style={{ fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>3. Disclaimer</h2>
        <p style={{ color: 'var(--text-2)', marginBottom: '16px', lineHeight: '1.6' }}>
          The materials on SmartCode are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
      </div>
    </Layout>
  );
};

export default TermsPage;
