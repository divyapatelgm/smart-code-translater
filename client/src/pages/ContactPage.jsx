import Layout from "../components/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Contact Us</h1>
        
        <p style={{ color: 'var(--text-2)', marginBottom: '32px', lineHeight: '1.6', fontSize: '18px' }}>
          Have questions or feedback? We'd love to hear from you.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--surface-2)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '8px' }}>Support</h3>
            <p style={{ color: 'var(--text-2)' }}>support@smartcode.example.com</p>
          </div>
          
          <div style={{ background: 'var(--surface-2)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '8px' }}>Business Enquiries</h3>
            <p style={{ color: 'var(--text-2)' }}>business@smartcode.example.com</p>
          </div>
          
          <div style={{ background: 'var(--surface-2)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '8px' }}>Address</h3>
            <p style={{ color: 'var(--text-2)' }}>123 Innovation Drive, Tech City, TC 90210</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
