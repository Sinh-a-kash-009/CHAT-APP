import React from 'react';

const Footer = () => {
  return (
    <div className="container" style={{backgroundColor:'black',width:'100vw', color:'text-body-secondary', position:'relative', top:'-439px'}} >
      <footer className="py-5">
        <div className="row">
          {/* Section 1 */}
          <div className="col-6 col-md-2 mb-3">
            <h5 className='hh'>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Features</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Pricing</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">FAQs</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">About</a>
              </li>
            </ul>
          </div>

          {/* Section 2 (Copy-pasted same as Section 1) */}
          <div className="col-6 col-md-2 mb-3">
            <h5 className='hh'>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Features</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Pricing</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">FAQs</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">About</a>
              </li>
            </ul>
          </div>

          {/* Section 3 (Copy-pasted same as Section 1) */}
          <div className="col-6 col-md-2 mb-3">
            <h5 className='hh'>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Features</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">Pricing</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">FAQs</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary hh">About</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5 className='hh'>Subscribe to our newsletter</h5>
              <p className='hh'>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input
                  id="newsletter1"
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p className='hh'>© 2025 Company, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-body-emphasis" href="#" aria-label="Instagram">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#instagram" />
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-body-emphasis" href="#" aria-label="Facebook">
                <svg className="bi" width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#facebook" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
