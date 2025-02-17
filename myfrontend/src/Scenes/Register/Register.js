import React, { useState } from "react";
import {
  useTheme,
  Box,
  Typography,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { tokens } from "../../theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../axiosConfig";

export const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isCompanyOwner, setIsCompanyOwner] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      if (isCompanyOwner) {
        const payload = {
          employeeRequest: {
            username: formData.get("username"),
            password: formData.get("password"),
            email: formData.get("email"),
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            company_permission: "A"
          },
          companyRequest: {
            company_name: formData.get("companyName")
          }
        };
        await axiosConfig.post("/usr/company/create_user_admin", payload);
      } else {
        const payload = {
          username: formData.get("username"),
          password: formData.get("password"),
          email: formData.get("email"),
          first_name: formData.get("firstName"),
          last_name: formData.get("lastName"),
          termos_e_condicoes: acceptTerms
        };
        await axiosConfig.post("/usr/user", payload);
      }
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="100px">
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="row"
        sx={{ backgroundColor: colors.primary[400], borderRadius: "1%" }}
      >
        <Box display="flex" width="35vw" justifyContent="center" alignItems="center">
          <Typography variant="h2" margin="35px 25px" color={colors.grey[200]}>
            Criar usuario
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" mb={2}>
          <Box margin="25px" width="100%">
            <ToggleButtonGroup
              exclusive
              fullWidth
              value={isCompanyOwner}
              onChange={(e, newValue) => {
                if (newValue !== null) {
                  setIsCompanyOwner(newValue);
                }
              }}
              sx={{
                width: '100%',
                "& .MuiToggleButton-root": {
                  flex: 1,
                  border: `1px solid ${colors.blueAccent[500]}`,
                  color: colors.grey[200],
                  "&.Mui-selected": {
                    backgroundColor: colors.blueAccent[500],
                    color: colors.grey[200],
                    "&:hover": {
                      backgroundColor: colors.blueAccent[600],
                    },
                  },
                  "&:hover": {
                    backgroundColor: colors.blueAccent[700],
                  },
                },
              }}
            >
              <ToggleButton value={false}>
                Funcionário
              </ToggleButton>
              <ToggleButton value={true}>
                Empresa
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" >
          <Box display="row" justifyContent="center" alignItems="center" width="100%">
            {/* Username field */}
            <Box margin="25px" >
              <FormControl fullWidth>
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  name="username"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircleIcon sx={{ color: colors.blueAccent[500] }} />
                    </InputAdornment>
                  }
                  label="Username"
                />
              </FormControl>
            </Box>

            {/* Password field */}
            <Box margin="25px">
              <FormControl fullWidth>
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  type="password"
                  name="password"
                  startAdornment={
                    <InputAdornment position="start">
                      <HttpsIcon sx={{ color: colors.blueAccent[500] }} />
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>

            {/* Email field */}
            <Box margin="25px">
              <FormControl fullWidth>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  name="email"
                  type="email"
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: colors.blueAccent[500] }} />
                    </InputAdornment>
                  }
                  label="Email"
                />
              </FormControl>
            </Box>

            {/* First Name field */}
            <Box margin="25px">
              <FormControl fullWidth>
                <InputLabel>Nome</InputLabel>
                <OutlinedInput
                  name="firstName"
                  label="First Name"
                />
              </FormControl>
            </Box>

            {/* Last Name field */}
            <Box margin="25px">
              <FormControl fullWidth>
                <InputLabel>Sobrenome</InputLabel>
                <OutlinedInput
                  name="lastName"
                  label="Last Name"
                />
              </FormControl>
            </Box>

            {/* Company Name field (only for company owners) */}
            {isCompanyOwner && (
              <Box margin="25px">
                <FormControl fullWidth>
                  <InputLabel>Company Name</InputLabel>
                  <OutlinedInput
                    name="companyName"
                    startAdornment={
                      <InputAdornment position="start">
                        <BusinessIcon sx={{ color: colors.blueAccent[500] }} />
                      </InputAdornment>
                    }
                    label="Company Name"
                  />
                </FormControl>
              </Box>
            )}

            {/* REMOVER APOS ADICIONAR TERMOS E COND EM NEWEMPLOYEE */}
            {!isCompanyOwner && (
              <Box margin="25px">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      required
                    />
                  }
                  label="Eu aceito os termos e condicoes"
                />
              </Box>
            )}
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" m="20px">
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ backgroundColor: colors.blueAccent[500], color: colors.grey[200] }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
