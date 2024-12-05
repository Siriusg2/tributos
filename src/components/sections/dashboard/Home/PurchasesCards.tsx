import { Stack } from '@mui/material';
import { purchasesData } from 'data/home-data';
import SaleInfo from '../Sales/SaleInfoSection/SaleInfo';

const PurchasesCards = () => {
  return (
    <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {purchasesData.map((saleInfoDataItem) => (
        <SaleInfo
          key={saleInfoDataItem.id}
          title={saleInfoDataItem.title}
          image={saleInfoDataItem.image}
          sales={saleInfoDataItem.sales}
          increment={saleInfoDataItem.increment}
          date={saleInfoDataItem.date}
        />
      ))}
    </Stack>
  );
};

export default PurchasesCards;
