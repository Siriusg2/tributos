import { Stack } from '@mui/material';
import { budgetsData } from 'data/home-data';
import SaleInfo from '../Sales/SaleInfoSection/SaleInfo';

const BudgetsCards = () => {
  return (
    <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {budgetsData.map((saleInfoDataItem) => (
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

export default BudgetsCards;
