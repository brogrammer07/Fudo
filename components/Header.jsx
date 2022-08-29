import Image from "next/image";
import css from "../styles/Header.module.css";
import Logo from "../assets/Logo.png";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";
import { useState, useEffect } from "react";
import Link from "next/link";
const Header = () => {
  const [order, setOrder] = useState("");
  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);
  const state = useStore((state) => state);
  const items = useStore((state) => state.cart.pizzas.length);
  return (
    <div className={css.header}>
      <div className={css.logo}>
        <Image src={Logo} alt="" width={50} height={50} />
        <span>Fudo</span>
      </div>
      <ul className={css.menu}>
        <li>
          <Link href="../">Home</Link>
        </li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>
      <div className={css.rightSide}>
        {items !== 0 ? (
          <Link href="/cart">
            <div className={css.cart}>
              <UilShoppingBag size={35} color="#2E2E2E" />
              <div className={css.badge}>{items}</div>
            </div>
          </Link>
        ) : (
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2E2E2E" />
            <div className={css.badge}>{items}</div>
          </div>
        )}
        {order && (
          <Link href={`/order/${order}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color="#2E2E2E" />
              {order !== "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
