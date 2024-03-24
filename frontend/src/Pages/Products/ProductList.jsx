import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  productList,
  fetchCategories,
} from "../../reducer/Products/ProdActions";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import SearchBar from "../../Component/ProductList/SearchBar";
import CategoryCheckboxList from "../../Component/ProductList/CategoryFilter";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ProductCard from "../../Component/ProductList/ProductCard";
import ProductDetailModal from "../../Component/ProductList/ProductDetailModal";

function ProductList({
  products,
  categories,
  next,
  previous,
  isAuthenticated,
  cartItems,
}) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct === null) {
      dispatch(productList(currentPage, searchText, categoriesArray));
    }
  }, [selectedProduct]);

  useEffect(() => {
    dispatch(productList(currentPage, searchText, categoriesArray));
  }, [dispatch, searchText, categoriesArray]);

  const handleNextPage = async () => {
    setLoading(true);
    try {
      await dispatch(productList(currentPage + 1, searchText));
      setCurrentPage((prevPage) => prevPage + 1); // Update state after dispatch
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = async () => {
    setLoading(true);
    try {
      await dispatch(productList(currentPage - 1, searchText));
      setCurrentPage((prevPage) => prevPage - 1); // Update state after dispatch
    } catch (error) {
      console.error("Error fetching previous page:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearchText(value);
  };

  const handleSelectedCategoriesChange = (selectedCategories) => {
    const categoriesArray = selectedCategories.map((category) => category.name);
    setCategoriesArray(categoriesArray);
    setCurrentPage(1);
  };

  return (
    <>
      <Grid
        container
        sx={{ pt: { xs: 7, sm: 8, md: 9 } }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item lg={3} xs={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Box sx={{ m: 1 }} noValidate autoComplete="off">
            <Typography sx={{ ml: 1, my: 1 }} variant="h5">
              Filtros
            </Typography>
            <SearchBar onSearchChange={handleSearchChange} />
            <CategoryCheckboxList
              key={1}
              categoryListArray={categories}
              onSelectedCategoriesChange={handleSelectedCategoriesChange}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          rowSpacing={2}
          sx={{
            ml: { xs: 1, md: 0 },
            mt: { xs: 1, md: 2 },
            pl: { xs: 1, md: 0 },
            mr: { xs: 0, md: 0 },
            pr: { xs: 1, md: 2 },
          }}
        >
          <Grid
            container
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {loading && <p>Loading...</p>}
            {products.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={() => setSelectedProduct(product)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {previous && (
            <button onClick={handlePreviousPage} disabled={loading}>
              Previous Page
            </button>
          )}
          {next && (
            <button onClick={handleNextPage} disabled={loading}>
              Next Page
            </button>
          )}
        </Grid>
      </Grid>
      <ProductDetailModal
        product={selectedProduct}
        isAuthenticated={isAuthenticated}
        onCloseModal={() => setSelectedProduct(null)}
        cartItems={cartItems}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    cartItems: state.CartReducer.items,
    products: state.ProdReducer.products,
    responseType: state.ProdReducer.type,
    next: state.ProdReducer.next,
    previous: state.ProdReducer.previous,
    categories: state.ProdReducer.categories,
  };
};

export default connect(mapStateToProps)(ProductList);
