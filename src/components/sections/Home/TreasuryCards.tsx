import { Stack } from '@mui/material';
import { treasuryData } from 'data/home-data';
import SaleInfo from '../dashboard/Sales/SaleInfoSection/SaleInfo';

const TreasuryCards = () => {
  return (
    <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {treasuryData.map((saleInfoDataItem) => (
        <SaleInfo
          key={saleInfoDataItem.id}
          title={saleInfoDataItem.title}
          image={saleInfoDataItem.image}
          amount={saleInfoDataItem.amount}
          increment={saleInfoDataItem.increment}
          date={saleInfoDataItem.date}
        />
      ))}
    </Stack>
  );
};

export default TreasuryCards;
