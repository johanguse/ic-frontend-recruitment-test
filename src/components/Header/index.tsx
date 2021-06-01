import React, { useState } from 'react';
import logo from 'assets/images/logo_instacarro.png';
import { ReactComponent as IconPhone } from 'assets/images/phone.svg';
import { ReactComponent as IconUser } from 'assets/images/user.svg';
import { ReactComponent as IconCaret } from 'assets/images/caret.svg';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="container header">
        <div className="logo">
          <img src={logo} title="Logo InstaCarro" alt="InstaCarro" />
        </div>
        <div className="phone">
          <a href="tel:+551135693465" className="phone__link">
            <IconPhone className="phone__link-icon" />
            <span className="phone__link-text">(11) 3569-3465</span>
          </a>
        </div>
        <div className="user-login">
          <IconUser />
          <p>User Test</p>
          <IconCaret className="user-login__caret" />
        </div>
      </header>
    </>
  );
};
export default Header;
