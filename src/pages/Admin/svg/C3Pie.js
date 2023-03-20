import { useEffect } from 'react';
import c3 from 'c3';
import 'c3/c3.css';

/* Component */
export const C3Pie = () => {
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
        console.log(
          [...new Set(data.data.map((order) => order.createtime))].map((date) =>
            data.data.reduce(
              (acc, cur) =>
                cur.createtime === date ? (acc += cur.total) : acc,
              0
            )
          )
        );
        console.log(data.data);
      });
  }, []);

  const drawChart = (data) => {
    c3.generate({
      bindto: '#pie',
      size: {
        height: 300,
        width: 420,
      },
      data: {
        columns: [
          ['men', 300],
          ['women', 200],
        ],
        type: 'pie',
        onclick: function (d, i) {
          console.log('onclick', d, i);
        },
        onmouseover: function (d, i) {
          console.log('onmouseover', d, i);
        },
        onmouseout: function (d, i) {
          console.log('onmouseout', d, i);
        },
      },
    });
  };

  return <div id="pie" />;
};
