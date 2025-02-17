import { Box, Button, CircularProgress, LinearProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { ptBR } from "@mui/x-data-grid/locales";
import AddIcon from '@mui/icons-material/Add';
import axiosConfig from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const ClientesTabela = ({ margin, altura, largura, companyId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columnscarga = [
    { field: "nome", headerName: "Cliente", flex: 0.5 },
    {
      field: "responsavelVendas",
      headerName: "Responsavel",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    { field: "email", headerName: "Email", flex: 0.8, align: "center",
      headerAlign: "center", },
    {
      field: "telefone",
      headerName: "Telefone",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    { field: "cpfCnpj", headerName: "Cpf / Cnpj", type: "number", flex: 0.5, align: "center",
      headerAlign: "center", },
    {
      field: " ",
      headerName: " ",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            sx={{
              color: colors.grey[200],
              backgroundColor: colors.blueAccent[500],
            }}
            component={Link}
            to={{
              pathname: `/dashboard/detalhes/${params.row.id}`,
              state: { id: params.row.id },
            }}
            size="small"
            startIcon={<AddIcon />}
          >
            Detalhes
          </Button>
        </strong>
      ),
    },
  ];

  const fetchCargas = async () => {
    try {
      // TODO: ADICIONAR ID DA EMPRESA DINAMICAMENTE
      const response = await axiosConfig.get('/ship/clientes/company/' + companyId, {
        withCredentials: true, // Ensure this is set
      });

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCargas();
  }, [companyId]);

  if (loading) {
    return <LinearProgress sx={{ color: colors.blueAccent[400] }} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const rows = data.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Box
      m={margin}
      height={altura}
      width={largura}
      sx={{
        "& .name-column-cell": {
          color: colors.greenAccent[400],
        },
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeader": {
          borderBottom: colors.blueAccent[400],
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.blueAccent[900],
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: colors.blueAccent[400],
          borderTop: "none",
        },
      }}
    >
      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columnscarga}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default ClientesTabela;
