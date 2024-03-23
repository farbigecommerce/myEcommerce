import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CategoryCheckboxList({
  categoryListArray,
  onSelectedCategoriesChange,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryToggle = (category) => {
    let newSelectedCategories = [...selectedCategories];
    const categoryIndex = selectedCategories.findIndex(
      (cat) => cat.id === category.id
    );

    if (categoryIndex === -1) {
      newSelectedCategories.push(category);
      newSelectedCategories = newSelectedCategories.concat(
        category.subcategories
      );
    } else {
      newSelectedCategories.splice(categoryIndex, 1);
      // Deselect all subcategories
      newSelectedCategories = newSelectedCategories.filter(
        (cat) => !category.subcategories.some((subcat) => subcat.id === cat.id)
      );
    }

    setSelectedCategories(newSelectedCategories);
    onSelectedCategoriesChange(newSelectedCategories);
  };

  const handleSubcategoryToggle = (subcategory) => {
    const subcategoryIndex = selectedCategories.findIndex(
      (subcat) => subcat.id === subcategory.id
    );
    let newSelectedCategories = [...selectedCategories];

    if (subcategoryIndex === -1) {
      newSelectedCategories.push(subcategory);
    } else {
      newSelectedCategories.splice(subcategoryIndex, 1);
    }

    categoryListArray.forEach((category) => {
      if (
        category.subcategories.every(
          (subcat) => !newSelectedCategories.includes(subcat)
        )
      ) {
        const categoryIndex = newSelectedCategories.findIndex(
          (cat) => cat.id === category.id
        );
        if (categoryIndex !== -1) {
          newSelectedCategories.splice(categoryIndex, 1);
        }
      }
    });

    setSelectedCategories(newSelectedCategories);
    onSelectedCategoriesChange(newSelectedCategories);
  };

  const isCategoryIntermediate = (category) => {
    const anySubcategorySelected = category.subcategories.some((subcategory) =>
      selectedCategories.includes(subcategory)
    );
    const allSubcategoriesSelected = category.subcategories.every(
      (subcategory) => selectedCategories.includes(subcategory)
    );
    return anySubcategorySelected && !allSubcategoriesSelected;
  };

  return (
    <Box sx={{ mr: 1, ml: 1 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Categorías
        </AccordionSummary>
        <AccordionDetails>
          {categoryListArray.map((category) => (
            <Box key={category.id}>
              <FormControlLabel
                label={<span style={{ fontSize: "14px" }}>{category.name}</span>}
                control={
                  <Checkbox
                    size="small"
                    checked={
                      selectedCategories.some(
                        (cat) => cat.id === category.id
                      ) ||
                      category.subcategories.every((subcategory) =>
                        selectedCategories.includes(subcategory)
                      )
                    }
                    indeterminate={isCategoryIntermediate(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                }
              />
              {category.subcategories &&
                category.subcategories.map((subcategory) => (
                  <Box key={subcategory.id}>
                    <FormControlLabel
                      label={<span style={{ fontSize: "12px" }}>{subcategory.name}</span>}
                      control={
                        <Checkbox
                          size="small"
                          checked={selectedCategories.some(
                            (subcat) => subcat.id === subcategory.id
                          )}
                          onChange={() => handleSubcategoryToggle(subcategory)}
                        />
                      }
                      sx={{ ml: 3, mb: 0 }}
                    />
                  </Box>
                ))}
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
