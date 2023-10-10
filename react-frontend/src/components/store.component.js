import React, { useState, useEffect } from "react";
import styles from "../css/store.module.css";
import { withRouter } from "../common/with-router";
import Pagination from "../utils/pagination.util";
import StoreService from "../services/store.service";
import Menu from "../utils/menu.util";
import ProductBox from "../utils/product-box.util";


const status = [
  { label: "Show All", checked: true },
  { label: "New", checked: false },
  { label: "Promotion", checked: false },
  { label: "Coming soon", checked: false },
  { label: "Out of stock", checked: false },
];

const categories = [
  { label: "Show All", checked: true },
  { label: "Circles", checked: false },
  { label: "Triangles", checked: false },
  { label: "Squares", checked: false },
  { label: "Rectangles", checked: false },
];

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState();
  const [categoryOptions, setCategoryOptions] = useState(categories);
  const [statusOptions, setStatusOptions] = useState(status);
  const [sortOrder, setSortOrder] = useState(["date", "asc"]);

  useEffect(() => {
    getProducts();
  }, [currentPage, productsPerPage, categoryOptions, statusOptions, sortOrder[0], sortOrder[1]]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getProducts();
  };

  const getProducts = async () => {
    setLoading(true);
    setMessage("");
    try {
      const data = await StoreService.getAllProducts(currentPage, productsPerPage, categoryOptions, statusOptions, sortOrder[0], sortOrder[1]);
      setProducts(data.products);
      setTotalPages(data.totalPages);

    } catch (error) {
      console.log("Error fetching products data: ", error);
      setMessage(error.response ? error.response.data.message : "An error has occurred.");

    } finally {
      setLoading(false);
    }
  };

  const updateOption = (label, options, setOptions) => {
    const updatedOptions = options.map((option) => {
      if (option.label === "Show All" && label !== "Show All") {
        return { ...option, checked: false };
      } else if (option.label !== "Show All" && label === "Show All") {
        return { ...option, checked: false };
      } else if (option.label === label) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const menuItems = [
    {
      name: "Categories",
      options: categoryOptions,
      items: categoryOptions.map((option) => ({
        label: option.label,
        action: () => updateOption(option.label, categoryOptions, setCategoryOptions),
      })),
    },
    {
      name: "Status",
      options: statusOptions,
      items: statusOptions.map((option) => ({
        label: option.label,
        action: () => updateOption(option.label, statusOptions, setStatusOptions),
      })),

    },
    {
      name: "Sort Products By",
      items: [
        {
          label: "date added",
          items: [
            { label: "newest", action: () => setSortOrder(["date", "asc"]) },
            { label: "oldest", action: () => setSortOrder(["date", "desc"]) },
          ],
        },
        {
          label: "price",
          items: [
            { label: "highest", action: () => setSortOrder(["price", "desc"]) },
            { label: "lowest", action: () => setSortOrder(["price", "asc"]) },
          ],
        },
        {
          label: "name",
          items: [
            { label: "ascending", action: () => setSortOrder(["name", "asc"]) },
            { label: "descending", action: () => setSortOrder(["name", "desc"]) },
          ],
        },
      ],
    },
    {
      name: "Per Page",
      items: [
        { label: "12", action: () => setProductsPerPage(12) },
        { label: "24", action: () => setProductsPerPage(24) },
        { label: "48", action: () => setProductsPerPage(48) },
        { label: "Show All", action: () => setProductsPerPage(1000) },
      ],
    },
  ];

  const renderProducts = () => {
    return products.map((product) => (
      < ProductBox key={product.id} product={product} />
    ));
  };

  return (
    <>
      <Menu menuItems={menuItems} />
      < div className={styles.productGrid} >
        {loading ? <> <p>Loading... </p> <span className={styles.spinner}></span> </> :
          products.length > 0 ? renderProducts() : <p>No products found from this selection.</p>}
      </div >
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default withRouter(Store);
