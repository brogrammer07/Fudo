import { Modal, useMantineTheme } from "@mantine/core";
import css from "../styles/OrderModa.module.css";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import toast from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";
const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const resetCart = useStore((state) => state.resetCart);

  const total = typeof window !== "undefined" && localStorage.getItem("total");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...formData, total, paymentMethod });
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }
    router.push(`/order/${id}`);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
      overlayOpacity={0.55}>
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
        />
        <textarea
          name="address"
          onChange={handleInput}
          placeholder="Address"
          cols={8}
          rows={3}></textarea>
        <span>
          You will pay <span>$ {total}</span> on delivery
        </span>
        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
    </Modal>
  );
};

export default OrderModal;
