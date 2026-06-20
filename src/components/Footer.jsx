export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copy">
            Debangshu Ghosh, {new Date().getFullYear()}
          </div>
          
          <div className="footer-socials">
            <a href="https://instagram.com/debangshu.dev" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              Instagram
            </a>
            <a href="mailto:ghosh.debangshu02@gmail.com" className="footer-social-link">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
