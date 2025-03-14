import React from "react";
import RelatoriosTabela from "./RelatoriosTabela";
import { Box, useTheme, Button, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";
import NovaCargapopup from "../../Components/NovaCargapopup";
import axiosConfig from "../../axiosConfig";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import DescriptionIcon from "@mui/icons-material/Description";
import BlockIcon from "@mui/icons-material/Block";
import { useState, useContext } from "react";
import { AuthContext } from "../../authContext";

import { mockTransactions } from "../../Data/mockData";


import StatBox from "../../Components/StatBox";

export default function Relatorios() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const stats = {
    option_t_count: 10,
    option_b_count: 5,
    option_p_count: 3,
    option_l_count: 2,
  };

  const { companies } = useContext(AuthContext);
      const [selectedCompany, setSelectedCompany] = useState(companies[0]?.companyName || "");

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

  const selectedCompanyObj = companies.find(company => company.companyName === selectedCompany);
  

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ boxShadow: 4 }}
        alignItems="center"
      >
        <Box>
        <Header title={selectedCompany} subtitle="Visao geral" companies={companies} onCompanyChange={setSelectedCompany} />

          
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
            title={"R$72000"}
            subtitle="Faturamento semestral"
            icon={<DescriptionIcon sx={{ color: colors.blueAccent[400] }} />}
            progress={`${(stats.option_b_count / (stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count)) * 100}`}
            colorprogressstat={colors.redAccent[500]}
            textcolor={colors.blueAccent[400]}
          />
        </Box>
        
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)", // Full width on extra small screens
          sm: "repeat(1, 1fr)", // Full width on small screens
          md: "repeat(4, 1fr)", // Three columns on medium screens
        }}
        mt="15px"
        gap="15px"
        gridAutoRows="minmax(140px, auto)"
      >
        <Box
          gridColumn={{
            xs: "span 3", // Full width on extra small screens
            sm: "span 3", // Full width on small screens
            md: "span 3", // Two-thirds width on medium screens
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          width="100%"
          height="auto"
          sx={{ boxShadow: 4 }}
        >
          <RelatoriosTabela margin={0} altura={"auto"} largura={"100%"} companyId={selectedCompanyObj?.id.companyId} />
        </Box>
        <Box
          gridColumn={{
            xs: "span 3", // Full width on extra small screens
            sm: "span 3", // Full width on small screens
            md: "span 1", // One-third width on medium screens
          }}
          width="100%"
          height="auto"
          backgroundColor={colors.primary[400]}
          sx={{ boxShadow: 4 }}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.blueAccent[400]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600" colors={colors.blueAccent[400]}>
              Atividade
            </Typography>
          </Box>
          {mockTransactions.map((transaction, index) => (
            <Box
              sx={{ boxShadow: 4 }}
              key={`${transaction.txId}-${index}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[400]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.blueAccent[400]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.blueAccent[500]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.blueAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
            
          ))}
        </Box>
      </Box>
    </Box>
  );
}
