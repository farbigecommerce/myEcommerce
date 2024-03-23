import React, { useState, useRef } from "react";
import {
  Modal,
  Typography,
  Box,
  Grid,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Button,
  ButtonGroup,
  FormHelperText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Link } from "react-router-dom";

import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const protocol = window.location.protocol; // Get the current protocol
const backend_domain = `${protocol}//${window.location.hostname}:8000`;

function ProductDetailModal({
  product,
  isAuthenticated,
  onCloseModal,
  cartItems,
}) {
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const imagesRef = useRef(null);
  const [num, setNum] = useState(1); // Initial value for num

  React.useEffect(() => {
    if (product) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [product]);

  // Function to count the number of a particular variant in the cart
  const countVariantInCart = (variantIndex) => {
    const variantName = product.variations[variantIndex].name;
    let count = 0;
    cartItems.forEach((item) => {
      if (item.product_variation.name === variantName) {
        count += item.quantity;
      }
    });
    return count;
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
    if (imagesRef.current) {
      const container = imagesRef.current;
      const imageElement = container.children[index];
      if (container && imageElement) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = imageElement.getBoundingClientRect();

        // Check if the image is fully visible in the container
        if (imageRect.left < containerRect.left) {
          // Scroll to the left to make the image fully visible on the left side
          container.scrollTo({
            left: imageElement.offsetLeft - container.offsetLeft,
            behavior: "smooth",
          });
        } else if (imageRect.right > containerRect.right) {
          // Scroll to the right to make the image fully visible on the right side
          container.scrollTo({
            left:
              imageElement.offsetLeft +
              imageElement.offsetWidth -
              container.offsetWidth +
              container.scrollLeft,
            behavior: "smooth",
          });
        }
      }
    }
  };

  const handleVariantChange = (event) => {
    const newVariant = parseInt(event.target.value);
    setSelectedVariantIndex(newVariant); // Update the selected variant index when radio button changes
    if (num > product.variations[newVariant].quantity) {
      if (product.variations[newVariant].quantity > 1) { 
      setNum(product.variations[newVariant].quantity);
      }
      else {
        setNum(1);
      }
    }
  };

  const handleSubtract = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };

  const handleAdd = () => {
    if (num < product.variations[selectedVariantIndex].quantity) {
      setNum(num + 1);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            borderRadius: "8px",
            width: "95%",
            maxWidth: "95%",
            "@media (min-width: 600px)": {
              maxWidth: "90%",
            },
            "@media (min-width: 960px)": {
              maxWidth: "80%",
            },
            "@media (min-width: 1280px)": {
              maxWidth: "70%",
            },
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden", // To cut off any excess height
                      maxHeight: "300px", // Change this value to adjust the height
                    }}
                  >
                    {product && product.pictures && (
                      <>
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "0%",
                            zIndex: 1,
                            transform: "translateY(-50%)",
                            height: "100%",
                            bgcolor: "rgba(128,128,128,0.2)",
                            borderRadius: 0,
                          }}
                          onClick={() =>
                            handleImageChange(
                              (selectedImageIndex -
                                1 +
                                product.pictures.length) %
                                product.pictures.length
                            )
                          }
                        >
                          <ChevronLeftIcon />
                        </IconButton>
                        <img
                          src={`${backend_domain}${product.pictures[selectedImageIndex].image}`}
                          alt={`Product ${selectedImageIndex + 1}`}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            display: "block",
                            objectFit: "cover",
                          }}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: "0%",
                            zIndex: 1,
                            transform: "translateY(-50%)",
                            height: "100%",
                            bgcolor: "rgba(128,128,128,0.2)",
                            borderRadius: 0,
                          }}
                          onClick={() =>
                            handleImageChange(
                              (selectedImageIndex + 1) % product.pictures.length
                            )
                          }
                        >
                          <ChevronRightIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <div
                    ref={imagesRef}
                    style={{
                      display: "flex",
                      overflowX: "hidden", // Hide horizontal scrollbar
                      overflowY: "hidden", // Hide vertical overflow
                      maxHeight: "100px", // Change this value to adjust the height
                      width: "100%", // Ensure full width of the container
                    }}
                  >
                    {product &&
                      product.pictures &&
                      product.pictures.map((picture, index) => (
                        <div
                          key={index}
                          style={{ flex: "0 0 auto", marginRight: "8px" }}
                        >
                          <img
                            src={`${backend_domain}${picture.image}`}
                            alt={`Image${index + 1}`}
                            style={{
                              height: "80px", // Set the height to 80px
                              width: "auto", // Let the width adjust while maintaining aspect ratio
                              maxWidth: "100%", // Ensure the image doesn't exceed its container
                              cursor: "pointer",
                              border:
                                index === selectedImageIndex
                                  ? "2px solid blue"
                                  : "none",
                              transition: "transform 0.2s ease-in-out",
                            }}
                            onClick={() => handleImageChange(index)}
                          />
                        </div>
                      ))}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              {product && product.name && (
                <Box sx={{ mt: { xs: 0, md: 1 } }}>
                  <Typography variant="h6" component="h2">
                    {product.name}
                  </Typography>
                </Box>
              )}
              {product && product.description && (
                <Typography sx={{ mt: 1 }}>{product.description}</Typography>
              )}
              {product && product.variations && (
                <Box sx={{ mt: 2 }}>
                  {product.variations[selectedVariantIndex] && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2">Elige uno:</Typography>
                      {product.variations.map((variation, index) => (
                        <div key={index}>
                          {" "}
                          {/* Add a parent div to encapsulate the RadioGroup and FormHelperText */}
                          <RadioGroup
                            value={selectedVariantIndex.toString()}
                            onChange={handleVariantChange}
                            sx={{ mb: 0, pb: 0 }}
                          >
                            <FormControlLabel
                              value={index.toString()}
                              control={<Radio size="small" />}
                              label={variation.name}
                            />
                          </RadioGroup>
                          {/* Conditionally render FormHelperText */}
                          {countVariantInCart(index) > 0 && (
                            <FormHelperText sx={{ m: 0, p: 0 }}>
                              {`${countVariantInCart(index)} en el carrito`}
                            </FormHelperText>
                          )}
                        </div>
                      ))}

                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-evenly"
                        sx={{ my: 1 }}
                      >
                        {product.variations[selectedVariantIndex].prices[0] && (
                          <Grid item>
                            <Typography
                              sx={{
                                color: "#1565c0",
                                fontWeight: 500,
                                fontSize: "20px",
                                //   marginTop: 1,
                                marginLeft: 1,
                                marginRight: 3,
                              }}
                            >
                              ${" "}
                              {
                                product.variations[selectedVariantIndex]
                                  .prices[0].price
                              }
                            </Typography>
                          </Grid>
                        )}

                        {product.variations[selectedVariantIndex]
                          .is_available && isAuthenticated ? (
                          <>
                            <Grid item>
                              <ButtonGroup
                                variant="contained"
                                size="small"
                                aria-label="Small button group"
                              >
                                <Button
                                  sx={{ minWidth: "auto" }}
                                  onClick={handleSubtract}
                                >
                                  <RemoveIcon sx={{ fontSize: 16 }} />
                                </Button>
                                <Button
                                  variant="outlined"
                                  sx={{ minWidth: "auto" }}
                                >
                                  {num}
                                </Button>
                                <Button
                                  sx={{ minWidth: "auto" }}
                                  onClick={handleAdd}
                                >
                                  <AddIcon sx={{ fontSize: 16 }} />
                                </Button>
                              </ButtonGroup>
                            </Grid>
                            <Grid item sx={{ ml: 2 }}>
                              <Button
                                size="small"
                                sx={{ p: 1, color: "#f9a825" }}
                              >
                                <AddShoppingCart sx={{ mr: 1 }} /> AGREGAR{" "}
                              </Button>
                            </Grid>
                          </>
                        ) : (
                          <Grid item sx={{ ml: 2 }}>
                            {!product.variations[selectedVariantIndex]
                              .is_available ? (
                              <Typography
                                variant="body2"
                                color="error"
                                // sx={{ pb: 1 }}
                              >
                                NO DISPONIBLE
                              </Typography>
                            ) : (
                              <Link to="/login">
                                <Button
                                  size="small"
                                  sx={{ p: 1, color: "primary" }}
                                >
                                  Iniciar sesión
                                </Button>
                              </Link>
                            )}
                          </Grid>
                        )}
                      </Grid>
                      <Paper>
                        <TableContainer sx={{ maxHeight: "150px" }}>
                          <Table
                            stickyHeader
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 550 }}>
                                  Características
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {product.variations[
                                selectedVariantIndex
                              ].attributes.map((attribute, attrIndex) => (
                                <TableRow
                                  key={attrIndex}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {attribute.name}
                                  </TableCell>
                                  <TableCell align="right">
                                    {attribute.description}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default ProductDetailModal;
