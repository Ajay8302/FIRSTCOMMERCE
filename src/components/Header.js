import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";

function Header() 
{
  //for cart only
  const { cartItems } = useSelector(state => state.cartReducer);
 
  //Getting data -- for Showing the local Storage saved user on top
  const {user} = JSON.parse(localStorage.getItem('CurrentUser'))

  //for Security Route -- Removing user from L.S and refresh the page
  const logout = () => {
    localStorage.removeItem('CurrentUser');
    window.location.reload();
  };

  return (
    <div className="header">
      <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            FirstCommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FaBars size={25} color="white" border={2} />
            </span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                 <FaUser /> <strong>{user.email.substring(0,user.email.length-10)}</strong> 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={logout}>
                  logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <BsFillCartCheckFill size={20} />
                  <span className="cart-count">{cartItems.length}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
        <Link classNameName="navbar-brand" to="/">
          FirstCommerce
        </Link>
        <button
          classNameName="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span classNameName="navbar-toggler-icon"><FaBars size={25} color='white'/></span>
        </button>
        <div classNameName="collapse navbar-collapse" id="navbarNav">
          <ul classNameName="navbar-nav ms-auto">
            <li classNameName="nav-item active">
              <Link classNameName="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li classNameName="nav-item">
              <Link classNameName="nav-link" to="/">
                user
              </Link>
            </li>
            <li classNameName="nav-item">
              <Link classNameName="nav-link" to="/">
                orders
              </Link>
            </li>
            <li classNameName="nav-item">
              <Link classNameName="nav-link" to="/">
                logout
              </Link>
            </li>
            <li classNameName="nav-item">
              <Link classNameName="nav-link" to="/">
                cart
              </Link>
            </li>
          </ul>
        </div>
      </nav>*/}
    </div>
  );
}

export default Header;
