import { SxProps, useTheme } from '@mui/material';
import ReactEchart from 'components/base/ReactEchart';
import * as echarts from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { LineSeriesOption } from 'echarts';
import { useMemo } from 'react';
import { EChartsOption } from 'echarts-for-react';

type RevenueChartProps = {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  seriesData?: LineSeriesOption[];
  legendData?: any;
  colors?: string[];
  sx?: SxProps;
};

const TreasuryChart = ({ chartRef, seriesData, legendData, colors, ...rest }: RevenueChartProps) => {
  const theme = useTheme();

  const option: EChartsOption = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        data: [
         '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
        ],
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: theme.palette.divider,
            width: 1,
            type: 'dashed',
          },
        },
        axisLabel: {
          show: true,
          padding: 30,
          color: theme.palette.text.secondary,
        
          fontFamily: theme.typography.body2.fontFamily,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        max: 10000000,
        min: 0,
        splitNumber: 4,
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
        show: false,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        valueFormatter: (value: any) => '$' + value.toFixed(0),
      },
      series: seriesData,
    }),
    [theme],
  );

  return <ReactEchart ref={chartRef} echarts={echarts} option={option} {...rest} />;
};

export default TreasuryChart;
