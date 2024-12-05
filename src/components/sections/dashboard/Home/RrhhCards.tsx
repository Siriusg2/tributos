import { Stack } from '@mui/material';
import { rrhhData } from 'data/home-data';
import SaleInfo from '../Sales/SaleInfoSection/SaleInfo';

const RrhhCards = () => {
  return (
    <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {rrhhData.map((saleInfoDataItem) => (
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

export default RrhhCards;
