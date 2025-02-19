import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import axiosConfig from "../../axiosConfig";

const FuncionarioModal = ({ open, onClose, funcionario, onSave, company_id }) => {
  const [formData, setFormData] = useState({
    permission: "",
    email: "",
  });

  useEffect(() => {
    if (funcionario) {
      setFormData(funcionario);
    } else {
      setFormData({
        permission: "",
        email: "",
      });
    }
  }, [funcionario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (funcionario) {
        await axios.put(`http://localhost:3000/funcionarios/${funcionario.id}`, formData);
      } else {
        const dataToSend = {
          ...formData,
          companyId: company_id
        };
        await axiosConfig.post("/usr/company/add_func", dataToSend);
      }
      onSave();
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const permissions = [
    { value: "A", label: "Admin" },
    { value: "B", label: "Criar/Editar" },
    { value: "C", label: "Apenas visualizar" },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {funcionario ? "Editar Funcionário" : "Adicionar funcionario a empresa"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Permissão</InputLabel>
                <Select
                  name="permission"
                  value={formData.permission}
                  onChange={handleChange}
                  label="Permissão"
                >
                  {permissions.map((perm) => (
                    <MenuItem key={perm.value} value={perm.value}>
                      {perm.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FuncionarioModal;
