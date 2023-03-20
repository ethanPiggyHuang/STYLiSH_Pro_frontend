import { useEffect } from 'react';
import c3 from 'c3';
import 'c3/c3.css';

/* Component */
export const MyC3Component = () => {
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
        // console.log(
        //   [...new Set(data.data.map((order) => order.createtime))].map((date) =>
        //     data.data.reduce(
        //       (acc, cur) =>
        //         cur.createtime === date ? (acc += cur.total) : acc,
        //       0
        //     )
        //   )
        // );
      });
  }, []);

  const drawChart = (data) => {
    c3.generate({
      bindto: '#chart',
      size: {
        height: 400,
        width: 900,
      },
      data: {
        columns: [['data1', ...data]],
        type: 'bar',
      },
    });
  };

  return <div id="chart" />;
};
