import { ReactElement, useMemo, useRef, useState } from 'react';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import BudgetsChart from './BudgetsChart';

const BudgetsChartCard = (): ReactElement => {
  const theme = useTheme();

  const budgetsSeriesData: PieDataItemOption[] = [
    { value: 150203255, name: 'Ejecutado' },
    { value: 702523666, name: 'Total' },
  ];

  const budgetsLegendData = [
    { name: 'Ejecutado', icon: 'circle' },
    { name: 'Total', icon: 'circle' },
  ];

  const earnsSeriesData: PieDataItemOption[] = [
    { value: 250203255, name: 'Gastos' },
    { value: 325004664, name: 'Ingresos' },
  ];

  const earnsLegendData = [
    { name: 'Gastos', icon: 'circle' },
    { name: 'Ingresos', icon: 'circle' },
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
    earns: false,
    bills: false,
  });

  const toggleClicked = (name: string) => {
    setPercentageType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const totalBudget = useMemo(
    () => budgetsSeriesData.reduce((acc: number, next: any) => acc + next.value, 0),
    [],
  );
  const totalEarns = useMemo(
    () => earnsSeriesData.reduce((acc: number, next: any) => acc + next.value, 0),
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
          Presupuesto
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
          <Stack direction="row" justifyContent="center" flex={'1 1 0%'}>
            <BudgetsChart
              name="Presupuesto"
              chartRef={chartRef}
              seriesData={budgetsSeriesData}
              colors={pieChartColors}
              legendData={budgetsLegendData}
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
            {Array.isArray(budgetsSeriesData) &&
              budgetsSeriesData.map((dataItem, index) => (
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
                      {((parseInt(`${dataItem.value}`) / totalBudget) * 100).toFixed(0)}%
                    </Typography>
                  </Stack>
                </Button>
              ))}
          </Stack>
        </Stack>
      </Box>

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
          Ingresos vs Gastos
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
          <Stack direction="row" justifyContent="center" flex={'1 1 0%'}>
            <BudgetsChart
              name="Ingresos vs Gastos"
              chartRef={chartRef}
              seriesData={earnsSeriesData}
              colors={pieChartColors}
              legendData={earnsLegendData}
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
            {Array.isArray(earnsSeriesData) &&
              earnsSeriesData.map((dataItem, index) => (
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
                      {((parseInt(`${dataItem.value}`) / totalEarns) * 100).toFixed(0)}%
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

export default BudgetsChartCard;
