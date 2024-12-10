import { SxProps, useTheme } from '@mui/material';
import ReactEchart from 'components/base/ReactEchart';
import * as echarts from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { LineSeriesOption } from 'echarts';
import { useMemo } from 'react';
import { EChartsOption } from 'echarts-for-react';

type TaxesChartProps = {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  seriesData?: LineSeriesOption[];
  maxValue?: number;
  minValue?: number;
  colors?: string[];
  sx?: SxProps;
  legendsData?: string[] | number[];
};

const TaxesChart = ({
  chartRef,
  seriesData,
  colors,
  maxValue,
  minValue,
  legendsData,
  ...rest
}: TaxesChartProps) => {
  const theme = useTheme();

  const option: EChartsOption = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        data: legendsData, // Utiliza legendsData directamente
        boundaryGap: false,

        axisLine: {
          show: true,
          lineStyle: {
            color: theme.palette.divider,
            width: 0.5,
            type: 'dashed',
          },
        },
        axisLabel: {
          show: true,
          padding: 3,
          color: theme.palette.text.secondary,
          formatter: (value: any) => value,
          fontFamily: theme.typography.body2.fontFamily,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        max: maxValue,
        min: minValue,
        splitNumber: 6,
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: theme.palette.text.secondary,
          align: 'center',
          padding: [0, 20, 0, 0],
          fontFamily: theme.typography.body2.fontFamily,
        },
        splitLine: {
          interval: 5,
          lineStyle: {
            color: theme.palette.divider,
            width: 1,
            type: 'dashed',
          },
        },
      },
      grid: {
        left: 60,
        right: 30,
        top: 30,
        bottom: 90,
      },
      legend: {
        show: true,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        valueFormatter: (value: any) => '$' + value.toFixed(0),
      },
      series: seriesData,
    }),
    [theme, legendsData, seriesData, maxValue, minValue], // Incluye legendsData como dependencia
  );

  return <ReactEchart ref={chartRef} echarts={echarts} option={option} {...rest} />;
};

export default TaxesChart;
