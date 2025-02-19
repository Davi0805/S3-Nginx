import { useState, useEffect, useContext } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import axiosConfig from "../../axiosConfig";

import { AuthContext } from "../../authContext";


const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const { companies } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      //const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage
      const userId = companies[0].id.userId;
      const response = await axiosConfig.get(`/usr/user/${userId}`);
      setUserData(response.data);
    } catch (error) {
      setMessage({ type: "error", text: "Error loading profile data" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await axiosConfig.put(`/usr/user/${userId}`, userData);
      setMessage({ type: "success", text: "Profile updated successfully" });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: "error", text: "Error updating profile" });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Perfil
          </Typography>
          {message.text && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              {!isEditing ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsEditing(false);
                      fetchUserData();
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
