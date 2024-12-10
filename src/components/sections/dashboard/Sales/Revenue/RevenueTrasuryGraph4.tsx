import { ReactElement, SetStateAction, useEffect, useRef, useState } from 'react';
import { Box, Button, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';

import TaxesChart from './TaxesChart';
import { chartTagsTreasury, taxesDataPerMonthTreasury, taxesDataPerYearTreasury, taxesDataPerMonthTreasuryReal } from 'data/collections-data';

const RevenueTreasurygraph4 = (): ReactElement => {
  const theme = useTheme();
  const [seeUsd, setSeeUsd] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Filtrar por periodo');
  const [selectedYear, setSelectedYear] = useState('2020'); 
  const [seeRealTerms, setSeeRealTerms] = useState<boolean>(false); // Nuevo estado para términos reales

  const [lengends, setLengends] = useState<string[] | []>(chartTagsTreasury.months);
  const [seriesData, setSeriesData] = useState<any>(taxesDataPerMonthTreasury);
  const [maxValue, setMaxValue] = useState(1000);

  const handleChangePeriod = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setSelectedPeriod(value);

    const baseData = value === 'years' ? taxesDataPerYearTreasury : taxesDataPerMonthTreasury;
    const conversionFactor = seeUsd ? 0.001 : 1; 

    setLengends(value === 'years' ? chartTagsTreasury.years : chartTagsTreasury.months);

    // Si estamos en términos reales, tomamos la data real
    if (seeRealTerms) {
      const realData = taxesDataPerMonthTreasuryReal.map((item: any) => {
        return {
          ...item,
          type: 'line',
          smooth: true,
          legendHoverLink: true,
          showSymbol: item.id === 1, // Por ejemplo el primero con símbolos
          symbolSize: 12,
          lineStyle: { width: 5 },
          // Convertimos count*unitPrice en total
          data: item.data.map((val: {count:number, unitPrice:number}) => (val.count * val.unitPrice) * conversionFactor),
          originalData: item.data // Guardamos data original para tooltip
        };
      });
      setSeriesData(realData);
      setMaxValue(1000 * conversionFactor);
    } else {
      setSeriesData(
        baseData.map((item: any) => ({
          ...item,
          data: item.data.map((val: number) => val * conversionFactor),
        })),
      );
      setMaxValue(value === 'years' ? 15000 * conversionFactor : 1000 * conversionFactor);
    }
  };

  const handleChangeCoin = () => {
    const conversionFactor = seeUsd ? 1000 : 0.001; 
    setSeeUsd((prevSeeUsd) => !prevSeeUsd); 
    
    setSeriesData((prevData: any[]) =>
      prevData.map((item: any) => {
        // Si estamos en reales, recalcular con el productCount * unitPrice * factor
        if (seeRealTerms && item.originalData) {
          return {
            ...item,
            data: item.originalData.map((val: {count:number, unitPrice:number}) => 
              val.count * val.unitPrice * (prevData === taxesDataPerMonthTreasuryReal ? conversionFactor : 1) // Ajustar si se cambian años
            )
          };
        } else {
          return {
            ...item,
            data: item.data.map((val: number) => val * conversionFactor),
          };
        }
      }),
    );

    setMaxValue((prevMax) => prevMax * conversionFactor);
  };

  const handleChangeYears = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedYear(event.target.value);
  };

  const handleToggleRealTerms = () => {
    // Al cambiar a términos reales, regeneramos los datos desde taxesDataPerMonthTreasuryReal
    setSeeRealTerms((prev) => !prev);
    const conversionFactor = seeUsd ? 0.001 : 1;
    
    if (!seeRealTerms) {
      // Activando términos reales
      const realData = taxesDataPerMonthTreasuryReal.map((item: any) => {
        return {
          ...item,
          type: 'line',
          smooth: true,
          legendHoverLink: true,
          showSymbol: item.id === 1,
          symbolSize: 12,
          lineStyle: { width: 5 },
          data: item.data.map((val: {count:number, unitPrice:number}) => (val.count * val.unitPrice) * conversionFactor),
          originalData: item.data // Guardamos la info original
        };
      });
      setSeriesData(realData);
      setMaxValue(1000 * conversionFactor);
    } else {
      // Desactivando términos reales, volver a la data normal
      const baseData = selectedPeriod === 'years' ? taxesDataPerYearTreasury : taxesDataPerMonthTreasury;
      setSeriesData(
        baseData.map((item: any) => ({
          ...item,
          data: item.data.map((val: number) => val * conversionFactor),
        })),
      );
      setMaxValue(selectedPeriod === 'years' ? 15000 * conversionFactor : 1000 * conversionFactor);
    }
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

  useEffect(() => {
    setSeriesData((prevData: any[]) =>
      prevData.map((item: any, index: number) => ({
        ...item,
        color: lineChartColors[index],
      })),
    );
  }, [selectedPeriod, seeUsd, seeRealTerms]);

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
          Anticipo a Proveedores
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
          
          {/* Nuevo botón para Ver en Términos Reales */}
          <Button size="small" onClick={handleToggleRealTerms} variant="outlined">
            {`Ver en ${seeRealTerms ? 'Valor Total' : 'Términos Reales'}`}
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
          seeRealTerms={seeRealTerms}
        />
      </Box>
    </Stack>
  );
};

export default RevenueTreasurygraph4;
