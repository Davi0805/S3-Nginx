import React from "react";
import RelatoriosTabela from "./RelatoriosTabela";
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";
import NovaCargapopup from "../../Components/NovaCargapopup";
import axiosConfig from "../../axiosConfig";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import DescriptionIcon from "@mui/icons-material/Description";
import BlockIcon from "@mui/icons-material/Block";

import StatBox from "../../Components/StatBox";

export default function Clientes() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const stats = {
    option_t_count: 10,
    option_b_count: 5,
    option_p_count: 3,
    option_l_count: 2,
  };

  const downloadFileFromApi = async (apiUrl, fileName, fileType) => {
    console.log("Downloading file...");
    try {
      const response = await axiosConfig.get(apiUrl, {
        responseType: "arraybuffer",

        headers: {
          "Content-Type": fileType,
        },
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: fileType }),
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ boxShadow: 4 }}
        alignItems="center"
      >
        <Box>
          <Header title="Nome da empresa" subtitle="Relatorios" />
          
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(3, 1fr)",
          sm: "repeat(6, 1fr)",
          md: "repeat(12, 1fr)",
        }}
        mt="15px"
        gap="15px"
        gridAutoRows="140px"
      >
        <Box
          gridColumn={{
            xs: "span 12",
            sm: "span 6",
            md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: 5 }}
        >
          <StatBox
            title={"0"}
            subtitle="Pagamentos a receber"
            icon={<DescriptionIcon sx={{ color: colors.blueAccent[400] }} />
            }
            progress={`${(stats.option_t_count / (stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count)) * 100}`}
/*             colorprogressstat={colors.blueAccent[400]} */
            textcolor={colors.blueAccent[400]} 
          />
        </Box>
        <Box
          gridColumn={{
            xs: "span 12",
            sm: "span 6",
            md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: 5 }}
        >
          <StatBox
            title={"0"}
            subtitle="Pagamentos pendentes"
            icon={<DescriptionIcon sx={{ color: colors.blueAccent[400] }} />}
            progress={`${(stats.option_p_count / (stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count)) * 100}`}
            colorprogressstat={colors.blueAccent[400]}
            textcolor={colors.blueAccent[400]}
          />
        </Box>
        <Box
          gridColumn={{
            xs: "span 12",
            sm: "span 6",
            md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          sx={{ boxShadow: 5 }}
        >
          <StatBox
            title={"R$15025"}
            subtitle="Custo operacional"
            icon={<LocalShippingIcon sx={{ color: colors.blueAccent[400] }} />}
            progress={`${(stats.option_l_count / (stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count)) * 100}`}
            colorprogressstat={colors.blueAccent[400]}
            textcolor={colors.blueAccent[400]}
          />
        </Box>
        <Box
          gridColumn={{
            xs: "span 12",
            sm: "span 6",
            md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: 5 }}
        >
          <StatBox
            title={"R$7200"}
            subtitle="Faturamento semestral"
            icon={<DescriptionIcon sx={{ color: colors.blueAccent[400] }} />}
            progress={`${(stats.option_b_count / (stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count)) * 100}`}
            colorprogressstat={colors.redAccent[500]}
            textcolor={colors.blueAccent[400]}
          />
        </Box>
        
      </Box>
      <Box mt="15px ">
        <RelatoriosTabela />
      </Box>
</Box>
      );
}
