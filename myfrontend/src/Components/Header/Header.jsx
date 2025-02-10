import { Typography, Box, useTheme, Select, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";

const Header = ({ title, subtitle/* , companies, onCompanyChange */ }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="30px">
      <Select
        value={title}
        /* onChange={(e) => onCompanyChange(e.target.value)} */
        variant="outlined"
        sx={{ 
          mb: "5px", 
          color: colors.grey[200], 
          fontWeight: "bold",
          '.MuiOutlinedInput-notchedOutline': { border: 0 } // Remove border
        }}
        renderValue={(selected) => (
          <Typography variant="h2" color={colors.grey[200]} fontWeight="bold">
            {selected}
          </Typography>
        )}
      >
        {/* {companies.map((title) => ( */}
          <MenuItem key={title} value={title}>
            {title}
          </MenuItem>
{/*         ))} */}
      </Select>
      <Typography variant="h5" marginLeft={"16px"} color={colors.blueAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
