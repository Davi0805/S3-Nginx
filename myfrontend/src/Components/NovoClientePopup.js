import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/system";
import { tokens } from "../theme";
import axiosConfig from "../axiosConfig";
import PropTypes from 'prop-types';

const NovoClientePopup = ({ company_id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpfCnpj: "",
    tipoCliente: "PESSOA_FISICA",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    dataCadastro: "",
    status: "ATIVO",
    radarSiscomex: true,
    tipoRadar: "EXPRESSO",
    paisOrigemImportacao: "",
    moedaPreferida: "BRL",
    portoDestino: "",
    observacoes: "",
    responsavelVendas: "",
    company_id: company_id,
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosConfig.post('/ship/clientes/', formData);
      console.log(response);
      setAlertMessage("Novo cliente adicionado!");
      setOpenAlert(true);
      setOpen(false);
    } catch (error) {
      console.error(error);
      setAlertMessage("Erro ao registrar novo cliente");
      setOpenAlert(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
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
        Novo Cliente
      </Button>
      <Dialog
        open={open}
        fullWidth
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle variant="h3" fontWeight="Bold" color={colors.grey[200]}>
          Registrar novo cliente
        </DialogTitle>
        <DialogContent>
          <Box marginTop="15px">
            <FormControl fullWidth>
              <InputLabel htmlFor="nome">Nome</InputLabel>
              <OutlinedInput
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                label="Nome"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="cpfCnpj">CPF/CNPJ</InputLabel>
              <OutlinedInput
                id="cpfCnpj"
                name="cpfCnpj"
                value={formData.cpfCnpj}
                onChange={handleInputChange}
                label="CPF/CNPJ"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="tipoCliente">Tipo de Cliente</InputLabel>
              <Select
                id="tipoCliente"
                name="tipoCliente"
                value={formData.tipoCliente}
                onChange={handleInputChange}
                label="Tipo de Cliente"
              >
                <MenuItem value="PESSOA_FISICA">Pessoa Física</MenuItem>
                <MenuItem value="PESSOA_JURIDICA">Pessoa Jurídica</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                label="Email"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="telefone">Telefone</InputLabel>
              <OutlinedInput
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                label="Telefone"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="cidade">Cidade</InputLabel>
              <OutlinedInput
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                label="Cidade"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="estado">Estado</InputLabel>
              <OutlinedInput
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                label="Estado"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="dataCadastro">Data de Cadastro</InputLabel>
              <OutlinedInput
                id="dataCadastro"
                name="dataCadastro"
                type="datetime-local"
                value={formData.dataCadastro}
                onChange={handleInputChange}
                label="Data de Cadastro"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="status">Status</InputLabel>
              <Select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="ATIVO">Ativo</MenuItem>
                <MenuItem value="INATIVO">Inativo</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="radarSiscomex">Radar Siscomex</InputLabel>
              <Select
                id="radarSiscomex"
                name="radarSiscomex"
                value={formData.radarSiscomex}
                onChange={handleInputChange}
                label="Radar Siscomex"
              >
                <MenuItem value={true}>Sim</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="tipoRadar">Tipo de Radar</InputLabel>
              <Select
                id="tipoRadar"
                name="tipoRadar"
                value={formData.tipoRadar}
                onChange={handleInputChange}
                label="Tipo de Radar"
              >
                <MenuItem value="EXPRESSO">Expresso</MenuItem>
                <MenuItem value="LIMITADO">Limitado</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="paisOrigemImportacao">País de Origem da Importação</InputLabel>
              <OutlinedInput
                id="paisOrigemImportacao"
                name="paisOrigemImportacao"
                value={formData.paisOrigemImportacao}
                onChange={handleInputChange}
                label="País de Origem da Importação"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="moedaPreferida">Moeda Preferida</InputLabel>
              <OutlinedInput
                id="moedaPreferida"
                name="moedaPreferida"
                value={formData.moedaPreferida}
                onChange={handleInputChange}
                label="Moeda Preferida"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="portoDestino">Porto de Destino</InputLabel>
              <OutlinedInput
                id="portoDestino"
                name="portoDestino"
                value={formData.portoDestino}
                onChange={handleInputChange}
                label="Porto de Destino"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="observacoes">Observações</InputLabel>
              <OutlinedInput
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                label="Observações"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="responsavelVendas">Responsável pelas Vendas</InputLabel>
              <OutlinedInput
                id="responsavelVendas"
                name="responsavelVendas"
                value={formData.responsavelVendas}
                onChange={handleInputChange}
                label="Responsável pelas Vendas"
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: colors.grey[200] }}>
            Cancelar
          </Button>
          <Button type="submit" sx={{ color: colors.grey[200] }}>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openAlert} 
        autoHideDuration={3000}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

NovoClientePopup.propTypes = {
  company_id: PropTypes.number.isRequired,
};

export default NovoClientePopup;
