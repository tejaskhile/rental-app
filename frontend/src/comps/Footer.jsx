import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h2>StayFinder</h2>
          <p>Find your perfect stay anywhere, anytime.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/listings">Browse Listings</a></li>
            <li><a href="/">Become a Host</a></li>
            <li><a href="/">About Us</a></li>
          </ul>
        </div>

        <div>
          <h3>Resources</h3>
          <ul>
            <li><a href="/faq">Help Center</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/contact">Contact Support</a></li>
          </ul>
        </div>

        <div>
          <h3>Get in Touch</h3>
          <p>Email: support@stayfinder.com</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} StayFinder. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
