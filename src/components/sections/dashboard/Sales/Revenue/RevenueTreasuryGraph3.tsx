import { ReactElement, useRef, useState } from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import RevenueChart from './RevenueChart';
import { LineSeriesOption } from 'echarts';
import TreasuryChart from './TreasuryChart';

const RevenueTreasurygraph3 = (): ReactElement => {
  const theme = useTheme();
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [seeUsd, setSeeUsd] = useState<boolean>(false);
  const lineChartColors = [
    theme.palette.secondary.main,
    theme.palette.primary.main,
    theme.palette.info.main,
  ];

  const legendData = [
    { name: 'Google ads', icon: 'circle' },
    { name: 'Facebook ads', icon: 'circle' },
  ];

  const seriesData: LineSeriesOption[] = [
    {
      id: 1,
      data: [
        500000,    // 00:00
        1500000,   // 02:00
        2000000,   // 04:00
        3500000,   // 06:00
        4500000,   // 08:00
        5000000,   // 10:00
        6500000,   // 12:00
        7200000,   // 14:00
        7600000,   // 16:00
        8000000,   // 18:00
        8500000,   // 20:00
        9000000    // 22:00
      ],
      type: 'line',
      smooth: true,
      color: lineChartColors[0],
      name: 'Acciones',
      legendHoverLink: true,
      showSymbol: true,
      symbolSize: 12,
      lineStyle: {
        width: 5,
      },
    },
    {
      id: 2,
      data: [
        1000000,   // 00:00
        2500000,   // 02:00
        2000000,   // 04:00
        3000000,   // 06:00
        3500000,   // 08:00
        4200000,   // 10:00
        3800000,   // 12:00
        4500000,   // 14:00
        4800000,   // 16:00
        5200000,   // 18:00
        5500000,   // 20:00
        4900000    // 22:00
      ],
      type: 'line',
      smooth: true,
      color: lineChartColors[1],
      name: 'Bonos Soberanos',
      legendHoverLink: true,
      showSymbol: false,
      symbolSize: 12,
      lineStyle: {
        width: 5,
      },
    },
    {
      id: 3,
      data: [
        2000000,   // 00:00
        3000000,   // 02:00
        3500000,   // 04:00
        4500000,   // 06:00
        5000000,   // 08:00
        6200000,   // 10:00
        7500000,   // 12:00
        8000000,   // 14:00
        8500000,   // 16:00
        9000000,   // 18:00
        9500000,   // 20:00
        9800000    // 22:00
      ],
      type: 'line',
      smooth: true,
      color: lineChartColors[2],
      name: 'Bonos Corporativos',
      legendHoverLink: true,
      showSymbol: false,
      symbolSize: 12,
      lineStyle: {
        width: 5,
      },
    },
  ];
  
  
  

  const onChartLegendSelectChanged = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  const [revenueAdType, setRevenueAdType] = useState<any>({
    'Google ads': false,
    'Facebook ads': false,
  });

  const toggleClicked = (name: string) => {
    setRevenueAdType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <Stack
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
       Inversiones diarias
      </Typography>
     
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
      <TreasuryChart
        chartRef={chartRef}
        sx={{ minHeight: 1 }}
        seriesData={seriesData}
        legendData={legendData}
        colors={lineChartColors}
      />
    </Box>
  </Stack> 
  );
};

export default RevenueTreasurygraph3;
