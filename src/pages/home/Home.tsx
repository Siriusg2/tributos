import Grid from '@mui/material/Unstable_Grid2';
import { ReactElement } from 'react';
import { drawerWidth } from 'layouts/main-layout';
import CollectionsCards from 'components/sections/Home/CollectionsCards';




import RrhhCards from 'components/sections/Home/RrhhCards';
import TreasuryCards from 'components/sections/Home/TreasuryCards';
import HousingCards from 'components/sections/Home/HousingCards';
import PurchasesCards from 'components/sections/Home/PurchasesCards';
import BudgetsChartCard from 'components/sections/Home/BudgetsChartCard';
import EmployeesProfile from 'components/sections/Home/EmployeesProfile';
import HousingChartCard from 'components/sections/Home/HousingChartCard';
import PurchasesChartCard from 'components/sections/Home/PurchaseChartCard';

const Home = (): ReactElement => {
  return (
    <Grid
      container
      component="main"
      columns={4}
      spacing={3.75}
      flexGrow={1}
      pt={4.375}
      pr={1.875}
      pb={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        pl: { xs: 3.75, lg: 0 },
      }}
    >
      <Grid xs={12}>
        <CollectionsCards />
      </Grid>

      <Grid xs={12} display={{ xs: 'flex', lg: 'flex', sm: 'flex', md: 'flex' }} gap={5}>
        <BudgetsChartCard />
      </Grid>

      <Grid xs={12} display={{ xs: 'flex', lg: 'flex', sm: 'flex', md: 'flex' }} gap={5}>
        <EmployeesProfile />
        <RrhhCards />
      </Grid>

      <Grid xs={12}>
        <TreasuryCards />
      </Grid>
      <Grid xs={12} display={{ xs: 'flex', lg: 'flex', sm: 'flex', md: 'flex' }} gap={5}>
        <HousingChartCard />
        <PurchasesChartCard />
      </Grid>
    </Grid>
  );
};

export default Home;
