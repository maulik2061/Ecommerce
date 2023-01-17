import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontex";
import reducer from "../reducer/filterReducer";
const Filtercontext = createContext();
const initialState = {
  filterProduct: [],
  allProduct: [],
  gridView: true,
  sortingValue: "lowest",
  filterRecord: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    minPrice: 0,
    price: 0,
  },
};
export const FilterContetxtProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setGridView = () => {
    return dispatch({ type: "SET_GRIDVIEW" });
  };
  const setListView = () => {
    return dispatch({ type: "SET_LISTVIEW" });
  };
  const sorting = (eve) => {
    let searchValue = eve.target.value;
    return dispatch({ type: "SORTING_VALUE", payload: searchValue });
  };
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };
  const updateFilterValue = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    console.log({ name, value });
    dispatch({ type: "UPDATE_FILTER_DATA", payload: { name, value } });
  };
  useEffect(() => {
    dispatch({ type: "SORT_FILTER_VALUE" });
    dispatch({ type: "UPDATE FILTER VALUE" });
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products, state.sortingValue, state.filterRecord]);

  return (
    <Filtercontext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateFilterValue,
        sorting,
        clearFilters,
      }}
    >
      {children}
    </Filtercontext.Provider>
  );
};
export const useFilterContext = () => {
  return useContext(Filtercontext);
};
