import { useEffect } from 'react';
import c3 from 'c3';
import 'c3/c3.css';

/* Component */
export const MyC3Component = () => {
  useEffect(() => {
    c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 46, 67, 79],
          ['data2', 20, 76, 57, 9],
        ],
        type: 'line',
      },
    });
  }, []);

  return <div id="chart" />;
};
