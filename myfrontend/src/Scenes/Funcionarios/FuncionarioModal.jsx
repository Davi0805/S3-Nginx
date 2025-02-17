import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";

const FuncionarioModal = ({ open, onClose, funcionario, onSave }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    if (funcionario) {
      setFormData(funcionario);
    } else {
      setFormData({
        nome: "",
        cargo: "",
        email: "",
        telefone: "",
      });
    }
  }, [funcionario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (funcionario) {
        await axios.put(`http://localhost:3000/funcionarios/${funcionario.id}`, formData);
      } else {
        await axios.post("http://localhost:3000/funcionarios", formData);
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
              <TextField
                fullWidth
                label="Cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
              />
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
