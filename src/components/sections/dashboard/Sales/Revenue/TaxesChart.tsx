// TaxesChart.jsx
import { SxProps, useTheme } from '@mui/material';
import ReactEchart from 'components/base/ReactEchart';
import * as echarts from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { LineSeriesOption } from 'echarts';
import { useMemo } from 'react';
import { EChartsOption } from 'echarts-for-react';

type TaxesChartProps = {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  seriesData?: any[];  // Cambiado a any[] para acceder a originalData
  maxValue?: number;
  minValue?: number;
  colors?: string[];
  sx?: SxProps;
  legendsData?: (string | number)[]; // Aseguramos que sea un array
  seeRealTerms?: boolean;
};

const TaxesChart = ({
  chartRef,
  seriesData,
  colors,
  maxValue,
  minValue,
  legendsData,
  seeRealTerms = false,
  ...rest
}: TaxesChartProps) => {
  const theme = useTheme();

  const option: EChartsOption = useMemo(() => {
    return {
      xAxis: {
        type: 'category',
        data: legendsData,
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
        formatter: (params: any) => {
          let tooltipTitle = params[0].axisValue;
          let html = `<div style="font-weight:bold;margin-bottom:5px;">${tooltipTitle}</div>`;

          params.forEach((p: any) => {
            const color = p.color;
            const seriesName = p.seriesName;
            const value = p.data;

            if (seeRealTerms) {
              // Verifica que legendsData sea un array y que axisValue sea válido
              const monthIndex =
                Array.isArray(legendsData) && p.axisValue ? legendsData.indexOf(p.axisValue) : -1;
              
              // Busca la serie original
              const serie = seriesData?.find((s) => s.name === seriesName);
              
              // Asegura que originalData exista y que monthIndex esté dentro de rango
              if (
                serie &&
                Array.isArray(serie.originalData) &&
                monthIndex >= 0 &&
                monthIndex < serie.originalData.length
              ) {
                const originalVal = serie.originalData[monthIndex]; 
                // originalVal = {count, unitPrice}

                if (originalVal) {
                  const total = originalVal.count * originalVal.unitPrice;
                  html += `
                    <div style="margin-bottom:3px;">
                      <span style="display:inline-block;width:10px;height:10px;background:${color};border-radius:50%;margin-right:5px;"></span>
                      ${seriesName}: ${originalVal.count} productos * $${originalVal.unitPrice} = $${total.toFixed(0)}
                    </div>
                  `;
                } else {
                  // Si no se encontró originalVal, mostramos valor normal
                  html += `
                    <div style="margin-bottom:3px;">
                      <span style="display:inline-block;width:10px;height:10px;background:${color};border-radius:50%;margin-right:5px;"></span>
                      ${seriesName}: $${value.toFixed(0)}
                    </div>
                  `;
                }
              } else {
                // Si no podemos acceder correctamente a originalData o monthIndex no es válido
                // mostramos el valor normal
                html += `
                  <div style="margin-bottom:3px;">
                    <span style="display:inline-block;width:10px;height:10px;background:${color};border-radius:50%;margin-right:5px;"></span>
                    ${seriesName}: $${value.toFixed(0)}
                  </div>
                `;
              }
            } else {
              // Vista normal sin términos reales
              html += `
                <div style="margin-bottom:3px;">
                  <span style="display:inline-block;width:10px;height:10px;background:${color};border-radius:50%;margin-right:5px;"></span>
                  ${seriesName}: $${value.toFixed(0)}
                </div>
              `;
            }
          });
          return html;
        },
      },
      series: seriesData,
    };
  }, [theme, legendsData, seriesData, maxValue, minValue, seeRealTerms]);

  return <ReactEchart ref={chartRef} echarts={echarts} option={option} {...rest} />;
};

export default TaxesChart;
