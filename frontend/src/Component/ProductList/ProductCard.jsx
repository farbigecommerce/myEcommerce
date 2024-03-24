import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const protocol = window.location.protocol; // Get the current protocol
const backend_domain = `${protocol}//${window.location.hostname}:8000`;

function ProductCard({ product=null, onSelectProduct=null }) {
  const cardStyle = {
    position: "relative",
    transition: "transform 0.5s",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const cardHoverStyle = {
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.03)",
  };

  const truncateStyle = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  return (
    <Card
      key={product.id} // Assuming product id is a unique identifier
      style={{ ...cardStyle }}
      sx={{
        "&:hover": {
          ...cardHoverStyle,
        },
      }}
      onClick={onSelectProduct}
    >
      <CardMedia
        component="img"
        height="194"
        image={`${backend_domain}${product.pictures[0]?.image}`} // Use optional chaining to handle potential undefined or null values
        alt="Image not found"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={truncateStyle}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, ...truncateStyle }}>
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
