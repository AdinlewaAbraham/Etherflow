import React from "react";
import "./Footer.css";

const footer = () => {
  return (
    <footer>
      <div class="col-md-4">
        <h5>Contact Us</h5>
        <p>Email: fakemail@gmail.com</p>
        <p>Phone: +234 (555) 81-8943-2013</p>
        <p>Address: 123 Main Street, Suite 200, Anytown USA</p>
      </div>
      <div class="col-md-4">
        <h5>Links</h5>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Terms of Service</a>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <h5>Follow Us</h5>
        <ul class="social-icons">
          <li>
            <a href="#">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-linkedin"></i>
            </a>
          </li>
        </ul>
        <p class="copyright">Copyright © 2021 Etherflow</p>
      </div>
    </footer>
  );
};

export default footer;
