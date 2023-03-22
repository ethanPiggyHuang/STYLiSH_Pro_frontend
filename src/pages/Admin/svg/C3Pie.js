import { useEffect, useState } from 'react';
import c3 from 'c3';
import 'c3/c3.css';

/* Component */
export const C3Pie = ({ productList }) => {
  const [data, setData] = useState({});
  const list = [
    201807201824, 201807202140, 201807202150, 201807202157, 201807242211,
    201807242216, 201807242222, 201807242228, 201807242230, 201807242232,
    201807242234, 201902191210, 201902191242, 201902191245, 201902191247,
    201902191275, 201902191276, 201902191277, 201902191278, 201902191279,
    201902191280,
  ];
  const dates = [
    '2023-03-16',
    '2023-03-17',
    '2023-03-18',
    '2023-03-19',
    '2023-03-20',
  ];

  useEffect(() => {
    list.forEach((id) => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data).findIndex((e) => e === id) === -1
      ) {
        fetch(
          `https://side-project2023.online/api/1.0/products/trafficreport?id=${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (Object.keys(data.data).length !== 0) {
              setData((prev) => {
                return { ...prev, ...data.data };
              });
            }
          });
      }
    });
  }, [productList]);

  useEffect(() => {
    if (productList.length !== 0) {
      let category = productList.reduce(
        (acc, cur) => {
          if (cur.category === 'men') {
            acc.men = [...acc.men, cur.productId];
          } else if (cur.category === 'women') {
            acc.women = [...acc.women, cur.productId];
          } else if (cur.category === 'accessories') {
            acc.accessories = [...acc.accessories, cur.productId];
          }
          return acc;
        },
        { men: [], women: [], accessories: [] }
      );
      const menFlows = dates.map((date) => {
        const flowPerId = category.men.map((id) => {
          const result = data[id].reduce((acc, cur) => {
            if (cur[date] !== undefined) {
              acc += Number(cur[date]);
            }
            return acc;
          }, 0);
          return result;
        });
        return flowPerId.reduce((acc, cur) => (acc += cur), 0);
      });
      const womenFlows = dates.map((date) => {
        const flowPerId = category.women.map((id) => {
          const result = data[id].reduce((acc, cur) => {
            if (cur[date] !== undefined) {
              acc += Number(cur[date]);
            }
            return acc;
          }, 0);
          return result;
        });
        return flowPerId.reduce((acc, cur) => (acc += cur), 0);
      });
      const accessoriesFlows = dates.map((date) => {
        const flowPerId = category.accessories.map((id) => {
          let result = 0;
          if (data[id] !== undefined) {
            result = data[id].reduce((acc, cur) => {
              if (cur[date] !== undefined) {
                acc += Number(cur[date]);
              }
              return acc;
            }, 0);
          }

          return result;
        });
        return Number(flowPerId.reduce((acc, cur) => (acc += cur), 0));
      });
      drawChart(menFlows, womenFlows, accessoriesFlows);
    }

    // console.log(category);
    // console.log(data);
  }, [data]);

  function drawChart(menFlows, womenFlows, accessoriesFlows) {
    const date = new Date();
    c3.generate({
      bindto: '#spline',
      size: {
        height: 300,
        width: 420,
      },
      data: {
        x: 'x',
        columns: [
          [
            'x',
            date.getDate() - 4,
            date.getDate() - 3,
            date.getDate() - 2,
            date.getDate() - 1,
            date.getDate(),
          ],
          ['男裝', ...menFlows],
          ['女裝', ...womenFlows],
          ['配件', ...accessoriesFlows],
          // ['data1', 300, 350, 300, 0, 0, 120],
          // ['data2', 130, 100, 140, 200, 150, 50],
        ],
        types: {
          男裝: 'area-spline',
          女裝: 'area-spline',
          配件: 'area-spline',
          // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
        },
        groups: [['男裝', '女裝', '配件']],
      },
    });
  }

  return <div id="spline" />;
};
