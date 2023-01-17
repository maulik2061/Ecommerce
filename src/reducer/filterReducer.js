const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((item) => item.price);
      let maxPrice = Math.max(...priceArr);
      return {
        ...state,
        filterProduct: [...action.payload],
        allProduct: [...action.payload],
        filterRecord: { ...state.filterRecord, maxPrice, price: maxPrice },
      };
    case "SET_GRIDVIEW":
      return {
        ...state,
        gridView: true,
      };
    case "SET_LISTVIEW":
      return {
        ...state,
        gridView: false,
      };
    case "SORTING_VALUE":
      return {
        ...state,
        sortingValue: action.payload,
      };
    case "SORT_FILTER_VALUE":
      let temData = "";
      const { filterProduct, sortingValue } = state;
      let sortValue = [...filterProduct];
      const sortedData = (a, b) => {
        if (sortingValue === "lowest") {
          return a.price - b.price;
        }
        if (sortingValue === "highest") {
          return b.price - a.price;
        }
        if (sortingValue === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sortingValue === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };
      temData = sortValue.sort(sortedData);
      return {
        ...state,
        filterProduct: temData,
      };
    case "UPDATE_FILTER_DATA":
      const { name, value } = action.payload;
      return {
        ...state,
        filterRecord: {
          ...state.filterRecord,
          [name]: value,
        },
      };
    case "UPDATE FILTER VALUE":
      const { text, category, company, color, price } = state.filterRecord;
      const { allProduct } = state;
      let mySearch = [...allProduct];
      if (text) {
        mySearch = mySearch.filter((item) => {
          return item.name.toLowerCase().includes(text);
        });
      }
      if (category !== "all") {
        mySearch = mySearch.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
      }
      if (company !== "all") {
        mySearch = mySearch.filter(
          (item) => item.company.toLowerCase() === company.toLowerCase()
        );
      }
      if (color !== "all") {
        // mySearch   = mySearch.filter((item) => {
        //   for(let i=0; i<item.colors.length;i++){
        //     if(item.colors[i]===color){
        //       return true
        //     }

        //   }
        // });
        mySearch = mySearch.filter((item) => {
          return item.colors.includes(color);
        });
      }
      if (price) {
        mySearch = mySearch.filter((item) => {
          return item.price <= price;
        });
      }
      return {
        ...state,
        filterProduct: mySearch,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filterRecord: {
          ...state.filterRecord,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          price: 0,
          maxPrice: state.filterRecord.maxPrice,
          minPrice: state.filterRecord.minPrice,
        },
      };
    default:
      return state;
  }
};
export default filterReducer;
