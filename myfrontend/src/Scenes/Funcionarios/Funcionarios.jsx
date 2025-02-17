import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import FuncionarioModal from "./FuncionarioModal";

import { AuthContext } from "../../authContext";
import axiosConfig from "../../axiosConfig";

const Funcionarios = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);

  const { companies } = useContext(AuthContext);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]?.companyName || "");

  const selectedCompanyObj = companies.find(company => company.companyName === selectedCompany);

  useEffect(() => {
    // Update selectedCompany when companies load/changes
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0].companyName);
    }
  }, [companies]); // Trigger when companies change

  const fetchFuncionarios = async () => {
    try {
      if (!selectedCompanyObj?.id.companyId) return; // Prevent invalid calls
      const response = await axiosConfig.get(
        `/usr/company/list_funcs/${selectedCompanyObj.id.companyId}`
      );
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, [selectedCompanyObj]);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este funcionário?")) {
      try {
        await axios.delete(`http://localhost:3000/funcionarios/${id}`);
        fetchFuncionarios();
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "first_name", headerName: "Nome", flex: 1 },
    { 
      field: "last_name", 
      headerName: "Sobrenome", 
      flex: 1,

    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "permission", headerName: "Permissao", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <IconButton onClick={() => {
            setSelectedFuncionario(row);
            setIsModalOpen(true);
          }}>
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={selectedCompany} subtitle="Funcionarios" companies={companies} onCompanyChange={setSelectedCompany} />
        <Button
          onClick={() => {
            setSelectedFuncionario(null);
            setIsModalOpen(true);
          }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Adicionar
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={funcionarios}
          columns={columns}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>

      <FuncionarioModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        funcionario={selectedFuncionario}
        onSave={() => {
          fetchFuncionarios();
          setIsModalOpen(false);
        }}
      />
    </Box>
  );
};

export default Funcionarios;
