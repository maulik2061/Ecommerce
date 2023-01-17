import React from "react";
import { useFilterContext } from "../context/filtercontext";
import GridView from "./GridView";
import ListView from "./ListView";
const ProductList = () => {
  const { filterProduct, gridView } = useFilterContext();
  if (gridView === true) {
    return <GridView product={filterProduct} />;
  }
  if (gridView === false) {
    return <ListView product={filterProduct} />;
  }
};

export default ProductList;
