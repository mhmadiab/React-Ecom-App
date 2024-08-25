import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customeypes/product";


const { product, productImg } = styles;

const Product = ({title,price,img}:TProduct) => {
  return (
    <div className={product}>
      <div className={productImg}>
        <img
          src={img}
          alt=""
        />
      </div>
      <h2>{title}</h2>
      <h3>{price} LBP</h3>
      <Button variant="info" style={{ color: "white" }}>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;