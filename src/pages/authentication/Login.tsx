import { ReactElement, Suspense, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import loginBanner from 'assets/authentication-banners/ayuntamiento.jpg';
import IconifyIcon from 'components/base/IconifyIcon';
import logo from 'assets/logo/logo_muni.png';
import Image from 'components/base/Image';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const Login = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Stack
      direction="row"
      bgcolor="background.paper"
      boxShadow={(theme) => theme.shadows[3]}
      height={560}
      width={{ md: 960 }}
    >
      <Stack width={{ md: 0.5 }} m={2.5} gap={10}>
        <Link href="/" width="fit-content">
          <Image src={logo} width={102.6} />
        </Link>
        <Stack alignItems="center" gap={2.5} width={330} mx="auto">
          <Typography variant="h3">Inicio de sesión</Typography>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="email">
              Correo electrónico
            </InputLabel>
            <TextField
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              variant="filled"
              placeholder="Ingrese su correo electrónico"
              id="email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconifyIcon icon="ic:baseline-email" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="password">
              Contraseña
            </InputLabel>
            <TextField
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              variant="filled"
              placeholder="********"
              type={showPassword ? 'text' : 'password'}
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      {showPassword ? (
                        <IconifyIcon icon="ic:baseline-key-off" />
                      ) : (
                        <IconifyIcon icon="ic:baseline-key" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Typography
            variant="body1"
            sx={{
              alignSelf: 'flex-end',
            }}
          >
            <Link href="/authentication/forgot-password" underline="hover">
              Olvide mi contrasena
            </Link>
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (credentials.username !== 'admin' && credentials.password !== 'admin') {
                toast.error('Credenciales incorrectas', {
                  style: {
                    backgroundColor: '#ff6464',
                    color: 'white',
                  },
                });
              } else {
                toast.success(`Bienvenido ${credentials.username}`, {
                  style: {
                    backgroundColor: '#1fa677',
                    color: 'white',
                  },
                });
                navigate('/inicio');
              }
            }}
          >
            Iniciar sesion
          </Button>
          {/*   <Typography variant="body2" color="text.secondary">
            No tienes una cuenta ?{' '}
            <Link
              href="/authentication/sign-up"
              underline="hover"
              fontSize={(theme) => theme.typography.body1.fontSize}
            >
              Sign up
            </Link>
          </Typography> */}
        </Stack>
      </Stack>
      <Suspense
        fallback={
          <Skeleton variant="rectangular" height={1} width={1} sx={{ bgcolor: 'primary.main' }} />
        }
      >
        <Image
          alt="Login banner"
          src={loginBanner}
          sx={{
            width: 0.5,
            display: { xs: 'none', md: 'block' },
          }}
        />
      </Suspense>
    </Stack>
  );
};

export default Login;
