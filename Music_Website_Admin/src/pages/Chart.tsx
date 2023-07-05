import React from 'react';
import { Line } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';

const DemoLine = () => {
  const data = [
    {
      year: 'Tháng 1',
      value: 0,
    },
    {
      year: 'Tháng 2',
      value: 0,
    },
    {
      year: 'Tháng 3',
      value: 13,
    },
    {
      year: 'Tháng 4',
      value: 23,
    },
    {
      year: 'Tháng 5',
      value: 19,
    },
    {
      year: 'Tháng 6',
      value: 18,
    },
    {
      year: 'Tháng 7',
      value: 9,
    },
    {
      year: 'Tháng 8',
      value: 0,
    },
    {
      year: 'Tháng 9',
      value: 0,
    },
    {
      year: 'Tháng 10',
      value: 0,
    },
    {
      year: 'Tháng 11',
      value: 0,
    },
    {
      year: 'Tháng 12',
      value: 0,
    },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  return (
    <PageContainer>
        <Line {...config} />
    </PageContainer>
  )
};

export default DemoLine;