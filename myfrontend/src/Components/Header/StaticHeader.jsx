import { Typography, Box, useTheme, Select, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";

const StaticHeader = ({ title, subtitle, companies, onCompanyChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="30px">
        
          <Typography marginLeft={"16px"} variant="h2" color={colors.grey[200]} fontWeight="bold">
            {title}
          </Typography>
        
      <Typography variant="h5" marginLeft={"16px"} color={colors.blueAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default StaticHeader;
