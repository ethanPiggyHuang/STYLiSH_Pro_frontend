import * as d3 from 'd3';

export const lineChart = (data, svgRefCurrent) => {
  // 設定 SVG 寬度和高度
  const width = 500;
  const height = 300;

  // 創建 SVG 元素
  const svg = d3
    .select(svgRefCurrent)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // 創建 x 軸比例尺
  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.year))
    .range([0, width]);

  // 創建 y 軸比例尺
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height, 0]);

  // 創建 x 軸和 y 軸
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  // 繪製 x 軸和 y 軸
  svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);

  svg.append('g').call(yAxis);

  // 繪製折線
  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.value));

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', line);

  // 添加標籤
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', height + 30)
    .style('text-anchor', 'middle')
    .text('Year');

  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -40)
    .style('text-anchor', 'middle')
    .text('Value');
};
