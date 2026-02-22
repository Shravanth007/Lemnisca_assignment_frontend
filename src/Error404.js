import './Error404.css';

function Error404() {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page not found</h2>
        <p className="error-description">The page you are looking for doesn't exist or has been moved</p>
        <button className="back-home-btn" onClick={() => window.location.href = '/'}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Error404;
