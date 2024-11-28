import { ReactElement } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link as Nav } from 'react-router-dom';
import logo from 'assets/logo/logo_muni.png';
import error404 from 'assets/404/img_404.png';
import Image from 'components/base/Image';

const Error404 = (): ReactElement => {
  const renderHeader: ReactElement = (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 20,
        left: 20,
        width: 1,
        lineHeight: 0,
      }}
    >
      <Image src={logo} width={200} />
    </Box>
  );
  return (
    <>
      {renderHeader}
      <Container>
        <Stack
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          mx="auto"
          maxWidth={480}
          py={12}
        >
          <Typography variant="h2" sx={{ mb: 3 }}>
            Lo sentimos, página no encontrada
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Lo sentimos, no podemos encontrar la página que buscas. Asegúrate de haber escrito bien
            la URL.
          </Typography>
          <Image
            src={error404}
            sx={{
              mx: 'auto',
              width: 1,
              height: 'auto',
              my: { xs: 5, sm: 10 },
            }}
          />
          <Button component={Nav} to="/" size="large" variant="contained">
            Volver a la página principal
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Error404;
