import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import { Snackbar } from "@mui/material";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0); // 0: Login, 1: Register
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  // Clear username and password when the page loads (to avoid browser autofill issues)
  React.useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        const result = await handleLogin(username, password);
        // You can handle any post-login logic here
      }

      if (formState === 1) {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0); // Switch to login after successful registration
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  
return (
  <ThemeProvider theme={defaultTheme}>
    <Grid container columns={12} component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid
        gridColumn="span 12"
        sm="span 4"
        md="span 7"
        sx={{
         // backgroundImage: "url('https://loremflickr.com/320/240/dog')",
         backgroundImage:'url("https://designpickle-resources.s3.us-east-2.amazonaws.com/2020/Zoom+Backgrounds/April/20_DesignPickle_Zoom_Background-11.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid
        gridColumn="span 12"
        sm="span 8"
        md="span 5"
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <div>
            <Button
              variant={formState === 0 ? "contained" : "text"}
              onClick={() => setFormState(0)}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? "contained" : "text"}
              onClick={() => setFormState(1)}
            >
              Sign Up
            </Button>
          </div>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            {formState === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                autoComplete="new-password"
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="new-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAuth}
            >
              {formState === 0 ? "Login" : "Register"}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>

    <Snackbar
      open={open}
      autoHideDuration={4000}
      message={message}
      onClose={() => setOpen(false)}
    />
  </ThemeProvider>
);

}