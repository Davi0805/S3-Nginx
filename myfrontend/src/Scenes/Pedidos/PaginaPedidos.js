import React, { useContext, useEffect } from "react";
import Pedidos from "./Pedidos";
import { Box, useTheme, Button } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";
import NovaCargapopup from "../../Components/NovaCargapopup";
import axiosConfig from "../../axiosConfig";
import { AuthContext } from "../../authContext";

export default function PaginaPedidos() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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

  useEffect(() => {
      // Retrieve companies from local storage or cookies if not available in context
      if (!companies.length) {
        const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
        setSelectedCompany(storedCompanies[0]?.companyName || "");
      }
    }, [companies]);

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
        <Header title={selectedCompany} subtitle="Registros de carga" companies={companies} onCompanyChange={setSelectedCompany} />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginRight="25px"
          sx={{ gap: "20px" }}
        >
          <NovaCargapopup company_id={selectedCompanyObj?.id.companyId} />
          <Button
            onClick={() =>
              downloadFileFromApi(
                "/export/",
                "ThePythonDjango.xls",
                "application/ms-excel",
              )
            }
            sx={{
              backgroundColor: colors.blueAccent[400],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              color: colors.grey[100],
            }}
          >
            Baixar planilhas
          </Button>
        </Box>
      </Box>
      <Box mt="15px ">
        <Pedidos company_id={selectedCompanyObj?.id.companyId}/>
      </Box>
    </Box>
  );
}
