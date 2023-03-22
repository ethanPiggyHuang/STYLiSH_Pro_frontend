import { useEffect } from 'react';
import styled from 'styled-components/macro';
import c3 from 'c3';
import 'c3/c3.css';
import './Chart1.css';

/* Component */
export const Chart1 = ({ size }) => {
  useEffect(() => {
    fetch('https://side-project2023.online/api/1.0/report/order/total')
      .then((res) => res.json())
      .then((data) => {
        drawChart(
          [...new Set(data.data.map((order) => order.createtime))].map((date) =>
            data.data.reduce(
              (acc, cur) =>
                cur.createtime === date ? (acc += cur.total) : acc,
              0
            )
          )
        );
      });
  }, []);

  const date = new Date();
  const day = date.getDate();
  const month = date.getDate();

  const drawChart = (data) => {
    const inMillion = data.map((number) => number / 1000000);

    c3.generate({
      bindto: '#chart1',
      size: {
        height: 400,
        //   width: 900,
      },
      data: {
        x: 'x',
        xFormat: '%Y%m%d',
        columns: [
          [
            'x',
            date.getDate() - 3,
            date.getDate() - 2,
            date.getDate() - 1,
            date.getDate(),
          ],
          ['單日總額', ...inMillion],
        ],
        type: 'bar',
      },
      color: {
        pattern: ['#FF877D'],
        // #aec7e8
      },
      axis: {
        y: {
          label: '百萬元',
        },
      },
    });
  };

  return <div id="chart1" />;
};
