import { ReactElement } from 'react';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import { currencyFormat } from 'helpers/format-functions';

type SaleInfoProps = {
  image?: string;
  title: string;
  amount: number;
  increment: number;
  date?: string;
};

const SaleInfo = ({ image, title, amount, increment, date }: SaleInfoProps): ReactElement => {
  return (
    <Card
      sx={(theme) => ({
        boxShadow: theme.shadows[4],
        width: 1,
        height: 'auto',
      })}
    >
      <CardMedia
        sx={{
          maxWidth: 70,
          maxHeight: 70,
        }}
      >
        <Image src={`${image}`} width={1} height={1} />
      </CardMedia>
      <CardContent
        sx={{
          flex: '1 1 auto',
          padding: 0,
          ':last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
            {title}
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {date}
          </Typography>
        </Stack>
        <Typography
          display={increment === 0 ? 'none' : 'flex'}
          variant="body1"
          component="p"
          color="text.secondary"
        >
          {currencyFormat(amount)}
        </Typography>
        {
          <Typography
            display={amount < 5000 ? 'flex' : 'none'}
            variant="body1"
            component="p"
            color="text.secondary"
          >
            {amount}
          </Typography>
        }
        <Typography
          variant="body2"
          color={increment < 0 ? 'error.main' : 'primary.main'}
          display={increment === 0 ? 'none' : ' flex'}
          alignItems="center"
          gap={1}
          whiteSpace={'nowrap'}
        >
          <IconifyIcon
            icon={`ph:trend-${increment < 0 ? 'down' : 'up'}-fill`}
            width={16}
            height={16}
          />
          {`${Math.abs(increment)}%`} ultimo mes
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SaleInfo;
