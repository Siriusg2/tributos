import { ReactElement, useMemo, useRef, useState } from 'react';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import WebsiteVisitorsChart from './WebsiteVisitorsChart';
import HousingChart from 'components/sections/Home/HousingChart';

const WebsiteVisitors = (): ReactElement => {
  const theme = useTheme();

  const seriesData: PieDataItemOption[] = [
    { value: 6840, name: 'Direct' },
    { value: 3960, name: 'Organic' },
    { value: 2160, name: 'Paid' },
    { value: 5040, name: 'Social' },
  ];

  const [percentageType, setPercentageType] = useState<any>({
    fullfilled: false,
    total: false,
  });


  const housingSeriesData: PieDataItemOption[] = [
    { value: 225203255, name: 'Adjudicado' },
    { value: 523336784, name: 'Cobrado' },
  ];

  const housingLegendData = [
    { name: 'Adjudicado', icon: 'circle' },
    { name: 'Cobrado', icon: 'circle' },
  ];
  const pieChartColors = [
    theme.palette.primary.main,
    theme.palette.error.main,
  ];

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
  const [visitorType, setVisitorType] = useState<any>({
    Direct: false,
    Organic: false,
    Paid: false,
    Social: false,
  });
  const totalHousing = useMemo(
    () => housingSeriesData.reduce((acc: number, next: any) => acc + next.value, 0),
    [],
  );
  const toggleClicked = (name: string) => {
    setVisitorType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const totalVisitors = useMemo(
    () => seriesData.reduce((acc: number, next: any) => acc + next.value, 0),
    [],
  );

  return (
    <Box
      sx={{
        bgcolor: 'common.white',
        borderRadius: 5,
        height: 'min-content',
        boxShadow: theme.shadows[4],
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
  );
};

export default WebsiteVisitors;



{/* <Stack
      bgcolor="common.white"
      borderRadius={5}
      minHeight={460}
      height={1}
      mx="auto"
      boxShadow={theme.shadows[4]}
    >
      <Stack
        direction={{ sm: 'row' }}
        justifyContent={{ sm: 'space-between' }}
        alignItems={{ sm: 'center' }}
        gap={2}
        padding={3.75}
      >
        <Typography variant="h5" color="text.primary">
          Recaudación
        </Typography>
        <Button variant="contained" onClick={() => setSeeUsd(!seeUsd)}>
          {' '}
          {seeUsd ? 'Ver en ARS' : 'Ver en USD'}{' '}
        </Button>
        <Stack direction="row" gap={2}>
          {Array.isArray(seriesData) &&
            seriesData.map((dataItem, index) => (
              <Button
                key={dataItem.id}
                variant="text"
                onClick={() => {
                  toggleClicked(dataItem.name as string);
                  onChartLegendSelectChanged(dataItem.name as string);
                }}
                sx={{
                  justifyContent: 'flex-start',
                  p: 0,
                  borderRadius: 1,
                  opacity: revenueAdType[`${dataItem.name}`] ? 0.5 : 1,
                }}
                disableRipple
              >
                {' '}
                <Stack direction="row" alignItems="center" gap={1} width={1}>
                  <Box
                    sx={{
                      width: 13,
                      height: 13,
                      bgcolor: revenueAdType[`${dataItem.name}`]
                        ? 'action.disabled'
                        : lineChartColors[index],
                      borderRadius: 400,
                    }}
                  ></Box>
                  <Typography variant="body2" color="text.secondary" flex={1} textAlign={'left'}>
                    {dataItem.name}
                  </Typography>
                </Stack>
              </Button>
            ))}
        </Stack>
      </Stack>
      <Box flex={1}>
        <RevenueChart
          chartRef={chartRef}
          sx={{ minHeight: 1 }}
          seriesData={seriesData}
          legendData={legendData}
          colors={lineChartColors}
        />
      </Box>
    </Stack> */}