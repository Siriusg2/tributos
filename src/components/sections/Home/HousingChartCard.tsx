import { ReactElement, useMemo, useRef, useState } from 'react';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import HousingChart from './HousingChart';

const HousingChartCard = (): ReactElement => {
  const theme = useTheme();

  const housingSeriesData: PieDataItemOption[] = [
    { value: 225203255, name: 'Adjudicado' },
    { value: 523336784, name: 'Cobrado' },
  ];

  const housingLegendData = [
    { name: 'Adjudicado', icon: 'circle' },
    { name: 'Cobrado', icon: 'circle' },
  ];

  const pieChartColors = [theme.palette.error.main, theme.palette.primary.main];

  const chartRef = useRef<EChartsReactCore | null>(null);
  const onChartLegendSelectChanged = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };
  const [percentageType, setPercentageType] = useState<any>({
    fullfilled: false,
    total: false,
  });

  const toggleClicked = (name: string) => {
    setPercentageType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const totalHousing = useMemo(
    () => housingSeriesData.reduce((acc: number, next: any) => acc + next.value, 0),
    [],
  );

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' }}
      display={'flex'}
      width={'100%'}
      gap={3.75}
    >
      <Box
        sx={{
          bgcolor: 'common.white',
          borderRadius: 5,
          height: 'min-content',
          boxShadow: theme.shadows[4],
          width: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 },
        }}
      >
        <Typography variant="subtitle1" color="text.primary" p={2.5}>
          Cartera de creditos de vivienda
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
          <Stack direction="row" justifyContent="center" flex={'1 1 0%'}>
            <HousingChart
              name="Cartera de creditos de vivienda"
              chartRef={chartRef}
              seriesData={housingSeriesData}
              colors={pieChartColors}
              legendData={housingLegendData}
              sx={{
                width: 222,
                maxHeight: 222,
                mx: 'auto',
              }}
            />
          </Stack>
          <Stack
            spacing={1}
            divider={<Divider />}
            sx={{ px: 2.5, py: 2.5 }}
            justifyContent="center"
            alignItems="stretch"
            flex={'1 1 0%'}
          >
            {Array.isArray(housingSeriesData) &&
              housingSeriesData.map((dataItem, index) => (
                <Button
                  key={dataItem.name}
                  variant="text"
                  fullWidth
                  onClick={() => {
                    toggleClicked(dataItem.name as string);
                    onChartLegendSelectChanged(dataItem.name as string);
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    p: 0,
                    borderRadius: 1,
                    opacity: percentageType[`${dataItem.name}`] ? 0.5 : 1,
                  }}
                  disableRipple
                >
                  <Stack direction="row" alignItems="center" gap={1} width={1}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: percentageType[`${dataItem.name}`]
                          ? 'action.disabled'
                          : pieChartColors[index],
                        borderRadius: 400,
                      }}
                    ></Box>
                    <Typography variant="body1" color="text.secondary" flex={1} textAlign={'left'}>
                      {dataItem.name}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {((parseInt(`${dataItem.value}`) / totalHousing) * 100).toFixed(0)}%
                    </Typography>
                  </Stack>
                </Button>
              ))}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default HousingChartCard;
