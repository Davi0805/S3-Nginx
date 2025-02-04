import { Box, Button, CircularProgress, LinearProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { ptBR } from "@mui/x-data-grid/locales";
import AddIcon from '@mui/icons-material/Add';
import axiosConfig from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Pedidos = ({ margin, altura, largura }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columnscarga = [
    { field: "ce_mercante", headerName: "Cliente", flex: 0.8 },
    {
      field: "shipping_status",
      headerName: "Status de Envio",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    { field: "type_of_load", headerName: "Tipo de Carga", flex: 0.8, align: "center",
      headerAlign: "center", },
    {
      field: "origin_name_display",
      headerName: "Origem",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    { field: "weight", headerName: "Peso", type: "number", flex: 0.5, align: "center",
      headerAlign: "center", },
    { field: "cost", headerName: "Custo", type: "number", flex: 0.5, align: "center",
      headerAlign: "center", },
    {
      field: "BL",
      headerName: "BL",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.blfile === null) {
          return (
            <Button style={{ color: colors.redAccent[500] }} size="small">
              Indisponível
            </Button>
          );
        } else {
          return (
            <strong>
              <a
                href={`http://127.0.0.1:8000/repositorio/bl/${params.row.id}`}
                download={params.row.filename + '.' + params.row.extension}
              >
                <Button
                  variant="contained"
                  sx={{
                    color: colors.grey[200],
                    backgroundColor: colors.blueAccent[500],
                  }}
                  size="small"
                >
                  Baixar
                </Button>
              </a>
            </strong>
          );
        }
      },
    },
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
      const response = await axiosConfig.get('/ship/shipments/user-dashboard', {
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
  }, []);

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

export default Pedidos;
