import { useEffect, useState } from 'react';
import c3 from 'c3';
import 'c3/c3.css';

/* Component */
export const PieChart2 = ({ productList, totals }) => {
  const [data, setData] = useState({});
  const list = [
    201807201824, 201807202140, 201807202150, 201807202157, 201807242211,
    201807242216, 201807242222, 201807242228, 201807242230, 201807242232,
    201807242234, 201902191210, 201902191242, 201902191245, 201902191247,
    201902191275, 201902191276, 201902191277, 201902191278, 201902191279,
    201902191280,
  ];
  // console.log(data);

  // useEffect(
  //   () => {
  //     list.forEach((id) => {
  //       // console.log(Object.keys(data));
  //       if (
  //         Object.keys(data).length === 0 ||
  //         Object.keys(data).findIndex(data) === -1
  //       ) {
  //         fetch(
  //           `https://side-project2023.online/api/1.0/products/trafficreport?id=${id}`
  //         )
  //           .then((res) => res.json())
  //           .then((data) => {
  //             if (Object.keys(data.data).length !== 0) {
  //               setData((prev) => {
  //                 return { ...prev, ...data.data };
  //               });
  //             }
  //           });
  //       }
  //     });
  //   },

  //   []
  // );

  const drawChart = (data) => {
    c3.generate({
      bindto: '#pie2',
      size: {
        height: 450,
        width: 500,
      },
      data: {
        columns: [
          ['男裝', Number(totals[2][0])],
          ['女裝', Number(totals[2][1])],
          ['配件', Number(totals[2][2])],
        ],
        type: 'pie',
        onclick: function (d, i) {
          // console.log('onclick', d, i);
        },
        onmouseover: function (d, i) {
          // console.log('onmouseover', d, i);
        },
        onmouseout: function (d, i) {
          // console.log('onmouseout', d, i);
        },
      },
    });
  };
  drawChart();

  return <div id="pie2" />;
};
