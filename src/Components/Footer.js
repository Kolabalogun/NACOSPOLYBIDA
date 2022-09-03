import React from "react";
import { Link } from "react-scroll";
import { useGlobalContext } from "../Function/Context";

const Footer = () => {
  const { navigate, handleLogout } = useGlobalContext();
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="summary">
          <h1>NACOSPOLYBIDA</h1>
          <p>
            To build an enabling campus environment and train students in technology and management through the earned ‘Bida Standard’ for sustainable development.
          </p>

          <div className="socials">
            <a href="">
              <img src="svg/f.svg" alt="" />
            </a>
            <a href="">
              <img src="svg/i.svg" alt="" />
            </a>
            <a href="">
              <img src="svg/l.svg" alt="" />
            </a>
            <a href="">
              <img src="svg/t.svg" alt="" />
            </a>
          </div>
        </div>
        <div className="others">
          <div className="links">
            <h4>Pages</h4>
            <ul>
              <li>
                <img src="svg/d.svg" alt="" />
                <Link
                  activeClass="active"
                  to="/"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="footlink"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  School Site
                </Link>
              </li>
              <li>
                <img src="svg/d.svg" alt="" />
                <Link
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="footlink"
                  style={{ cursor: "pointer" }}
                >
                  Jamb Site
                </Link>
              </li>

              <li>
                <img src="svg/d.svg" alt="" />
                <Link
                  activeClass="active"
                  to="/contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="footlink"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  School Library
                </Link>
              </li>
            </ul>
          </div>
          <div className="contactfooter">
            <h4>Contact</h4>
            <p>
              North Central, Nigeria <br />
              KM 1.5, Doko Road, Bida <br />
              Niger State.
              <br />
              <br />
              <strong>Phone</strong>{" "}
              <a href="tel:+2348132667126" style={{ color: "black" }}>
                +234 81234567
              </a>{" "}
              <br />
              <strong>Email</strong>{" "}
              <a
                href="mailto:"
                style={{ color: "black" }}
              >
                nascospolybida@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <div onDoubleClick={handleLogout} className="copyri">
          © Copyright. All Right Reserved
        </div>
        <div className="compNmae">
          Powered By <a href="https://kuagiresources.com">Kuagi Resources</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
