import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

/* Component */
export const MyD3Component = ({ data }) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
      passes. In this case it will hold our component's SVG DOM element. It's
      initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(() => {
    if (data && d3Container.current) {
      // 設定 SVG 寬度和高度
      const width = 500;
      const height = 50;

      // 創建 SVG 元素
      const svg = d3
        .select(svgRefCurrent)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    }
  }, [data, d3Container.current]);

  return (
    <svg className="d3-component" width={400} height={200} ref={d3Container} />
  );
};
