import { React, useContext, useState, useEffect } from "react";
import ClientesTabela from "./ClientesTabela";
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";
import NovaCargapopup from "../../Components/NovaCargapopup";
import NovoClientePopup from "../../Components/NovoClientePopup";
import axiosConfig from "../../axiosConfig";

import { AuthContext } from "../../authContext";

export default function Clientes() {
  const theme = useTheme();
  const { companies } = useContext(AuthContext);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]?.companyName || "");
  const colors = tokens(theme.palette.mode);
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
        sx={{ boxShadow: 4, mb: "5px"}}
        alignItems="center"
      >
        <Box>
        <Header title={selectedCompany} subtitle="Registros de clientes" companies={companies} onCompanyChange={setSelectedCompany} />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginRight="25px"
          sx={{ gap: "20px" }}
        >
          {/* <NovaCargapopup /> */}
          <NovoClientePopup company_id={selectedCompanyObj?.id.companyId} />
        </Box>
      </Box>
      <Box mt="15px ">
        <ClientesTabela companyId={selectedCompanyObj?.id.companyId} />
      </Box>
    </Box>
  );
}
