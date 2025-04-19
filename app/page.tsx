export default function LandingPage() {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', color: '#0070f3', marginBottom: '10px' }}>
          Insight Ink
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          AI-powered note-taking application
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <a 
            href="/login" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              background: 'white',
              color: '#0070f3',
              border: '1px solid #0070f3',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Login
          </a>
          <a 
            href="/signup" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              background: '#0070f3',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Sign Up
          </a>
        </div>
      </header>
      
      <main>
        <section style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }}>
            Capture ideas with AI-powered notes
          </h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
            Insight Ink helps you organize your thoughts with AI-powered tagging, semantic search, and smart suggestions.
          </p>
          <a 
            href="/signup" 
            style={{ 
              display: 'inline-block',
              padding: '15px 30px',
              background: '#0070f3',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            Get Started
          </a>
        </section>
        
        <section>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '30px', textAlign: 'center' }}>
            Features
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '60px'
          }}>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                backgroundColor: '#e6f7ff',
                color: '#0070f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>T</div>
              <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
                AI-Powered Tagging
              </h3>
              <p style={{ color: '#666' }}>
                Automatically tag your notes using AI to keep everything organized.
              </p>
            </div>
            
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                backgroundColor: '#e6f7ff',
                color: '#0070f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>S</div>
              <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
                Semantic Search
              </h3>
              <p style={{ color: '#666' }}>
                Find what you're looking for even if you don't remember the exact words.
              </p>
            </div>
          </div>
        </section>
        
        <section style={{ 
          backgroundColor: '#0070f3', 
          color: 'white', 
          padding: '40px', 
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            Ready to start taking smarter notes?
          </h2>
          <p style={{ marginBottom: '30px', color: '#cce4ff' }}>
            Join thousands of users who are organizing their thoughts more efficiently.
          </p>
          <a 
            href="/signup" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              background: 'white',
              color: '#0070f3',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Sign up for free
          </a>
        </section>
      </main>
      
      <footer style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
        © {new Date().getFullYear()} Insight Ink. All rights reserved.
      </footer>
    </div>
  );
}
