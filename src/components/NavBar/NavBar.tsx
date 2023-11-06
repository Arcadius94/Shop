import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import { useCartContext } from "../../context/CartProvider";

export const NavBar = () => {
  const { totalItems } = useCartContext();
  return (
    <div className={style.navbar}>
      <div className={style.navList}>
        <Link className={style.shopName} to={"/contact"}>
          ShopName
        </Link>
        <Link className={style.navItem} to={"/"}>
          Home
        </Link>
        <Link className={style.navItem} to={"/products"}>
          Products
        </Link>
        <Link className={style.navItem} to={"/contact"}>
          Contact
        </Link>
      </div>

      <Link className={style.cartIcon} to={"/cart"}>
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8,16a2,2,0,1,0,2,2A2.002,2.002,0,0,0,8,16Zm0,3a1,1,0,1,1,1-1A1.0013,1.0013,0,0,1,8,19Z" />
          <path d="M18,16a2,2,0,1,0,2,2A2.002,2.002,0,0,0,18,16Zm0,3a1,1,0,1,1,1-1A1.0013,1.0013,0,0,1,18,19Z" />
          <path d="M21.7505,6.7759l-.5557,5A2.4979,2.4979,0,0,1,18.71,14H8.5A2.503,2.503,0,0,1,6,11.5v-5A1.5017,1.5017,0,0,0,4.5,5h-2a.5.5,0,0,1,0-1h2A2.503,2.503,0,0,1,7,6.5v5A1.5017,1.5017,0,0,0,8.5,13H18.71a1.4986,1.4986,0,0,0,1.4907-1.3345l.5556-5a1.5023,1.5023,0,0,0-.373-1.166A1.482,1.482,0,0,0,19.2656,5H10.5a.5.5,0,0,1,0-1h8.7656a2.5008,2.5008,0,0,1,2.4849,2.7759Z" />
        </svg>
        {totalItems === 0 ? null : (
          <div className={style.cartQtnShow}>{totalItems}</div>
        )}
      </Link>
    </div>
  );
};
