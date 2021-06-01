import React, { useState } from 'react';
import logo from 'assets/images/logo_instacarro.png';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="container header">
        <div className="logo">
          <img src={logo} title="Logo InstaCarro" alt="InstaCarro" />
        </div>
        <div className="phone">
          <a href="tel:+551135693465" className="tel">
            (11) 3569-3465
          </a>
        </div>
        <div className="user-login">
          <p>User Test</p>
        </div>
      </header>
    </>
  );
};
export default Header;
