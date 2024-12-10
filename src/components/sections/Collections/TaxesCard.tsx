import { ReactElement, useEffect, useRef, useState } from 'react';
import { Box, Button, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { chartTags, taxesDataPerMonth, taxesDataPerYear } from '../../../data/collections-data';
import TaxesChart from './TaxesChart';

const TaxesCard = (): ReactElement => {
  const theme = useTheme();
  const [seeUsd, setSeeUsd] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Filtrar por periodo');
  const [selectedYear, setSelectedYear] = useState('2020'); // Valor inicial
  const [lengends, setLengends] = useState<string[] | []>(chartTags.months);
  const [seriesData, setSeriesData] = useState<any>(taxesDataPerMonth);
  const [maxValue, setMaxValue] = useState(1000);

  const handleChangePeriod = (event) => {
    const { value } = event.target;
    setSelectedPeriod(value);

    const baseData = value === 'years' ? taxesDataPerYear : taxesDataPerMonth;
    const conversionFactor = seeUsd ? 0.001 : 1; // Aplica la conversión según la moneda actual

    // Actualiza las leyendas y datos del gráfico
    setLengends(value === 'years' ? chartTags.years : chartTags.months);
    setSeriesData(
      baseData.map((item: any) => ({
        ...item,
        data: item.data.map((val: number) => val * conversionFactor),
      })),
    );

    // Ajusta el valor máximo
    setMaxValue(value === 'years' ? 15000 * conversionFactor : 1000 * conversionFactor);
  };

  const handleChangeCoin = () => {
    const conversionFactor = seeUsd ? 0.001 : 1000; // Factor dinámico según la moneda
    setSeeUsd((prevSeeUsd) => !prevSeeUsd); // Alterna entre USD y ARS

    // Actualiza los datos de la serie y el valor máximo
    setSeriesData((prevData) =>
      prevData.map((item: any) => ({
        ...item,
        data: item.data.map((val: number) => val * conversionFactor),
      })),
    );

    setMaxValue((prevMax) => prevMax * conversionFactor);
  };

  const handleChangeYears = (event) => {
    setSelectedYear(event.target.value); // Actualiza el estado con el valor seleccionado
  };

  const chartRef = useRef<EChartsReactCore | null>(null);
  const lineChartColors = [
    theme.palette.secondary.light,
    theme.palette.error.dark,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.success.main,
  ];

  // Aplica colores a los datos de la serie
  useEffect(() => {
    setSeriesData((prevData) =>
      prevData.map((item: any, index: number) => ({
        ...item,
        color: lineChartColors[index],
      })),
    );
  }, [selectedPeriod, seeUsd]);

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
        height={150}
        padding={3.75}
      >
        <Typography
          variant="subtitle1"
          color="text.primary"
          flex={1}
          textAlign={{ xs: 'center', sm: 'left' }}
        >
          Tributos municipales
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          width={1}
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
        >
          <Select
            size="small"
            value={selectedPeriod}
            onChange={handleChangePeriod}
            sx={{ minWidth: 170, textAlign: 'center' }}
          >
            <MenuItem value="Filtrar por periodo" disabled>
              Filtro por periodo
            </MenuItem>
            <MenuItem value="years">Ver en años</MenuItem>
            <MenuItem value="months">Ver en meses</MenuItem>
          </Select>

          {selectedPeriod === 'months' && (
            <Select
              size="small"
              value={selectedYear}
              onChange={handleChangeYears}
              sx={{ minWidth: 170, textAlign: 'center' }}
            >
              <MenuItem value="Seleccione el año" disabled>
                Seleccione el año
              </MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          )}
          <Button size="small" onClick={handleChangeCoin} variant="outlined">
            {`Ver en ${seeUsd ? 'USD' : 'ARS'}`}
          </Button>
        </Stack>
      </Stack>
      <Box flex={1}>
        <TaxesChart
          chartRef={chartRef}
          sx={{ minHeight: 1 }}
          seriesData={seriesData}
          maxValue={maxValue}
          minValue={0}
          legendsData={lengends}
        />
      </Box>
    </Stack>
  );
};

export default TaxesCard;
