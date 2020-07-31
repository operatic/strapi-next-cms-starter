import React from "react";
import Link from "next/link";
import Query from "../components/query";

const Nav = () => {
  return (
    <div>
      <div>
        <nav className="uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <Link href="/">
                  <a>Easy CMS!</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="uk-navbar-right"></div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
