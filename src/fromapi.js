import { select, scaleLinear, scaleBand, max, axisBottom, axisLeft } from "d3"

// Margin for margin convention
const margin = {
  left: 30,
  right: 20,
  top: 20,
  bottom: 20
}

// Inner width & height
const w = 400 - margin.left - margin.right
const h = 300 - margin.top - margin.bottom

// Define SVG element
const svg = select("body")
  .append("svg")
  .attr("class", "fromapi")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// fromapiRender
const fromapiRender = () => {
  // Dataset
  const data = [
    { name: "fir", number: Math.random().toFixed(1) * 50 },
    { name: "sec", number: Math.random().toFixed(1) * 100 },
    { name: "thi", number: Math.random().toFixed(1) * 30 },
    { name: "fou", number: Math.random().toFixed(1) * 100 },
    { name: "fif", number: Math.random().toFixed(1) * 40 },
    { name: "six", number: Math.random().toFixed(1) * 30 },
    { name: "sev", number: Math.random().toFixed(1) * 100 },
    { name: "eig", number: Math.random().toFixed(1) * 40 },
    { name: "nin", number: Math.random().toFixed(1) * 100 },
    { name: "ten", number: Math.random().toFixed(1) * 70 }
  ]
  // X Scale
  const xScale = scaleBand()
    .domain(data.map(item => item.name))
    .range([0, w])

  // Y Scale
  const yScale = scaleLinear()
    .domain([0, max(data, d => d.number)])
    .range([h, 0])

  // Barchart
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => (i * w) / data.length)
    .attr("y", d => yScale(d.number))
    .attr("width", w / data.length)
    .attr("height", d => h - yScale(d.number))
    .attr("stroke", "orange")

  // Axis
  const xAxis = axisBottom(xScale)
  const yAxis = axisLeft(yScale)

  // x Axis
  svg
    .append("g")
    .attr("class", "x-axis")
    .call(xAxis)
    .attr("transform", `translate(0, ${h})`)

  // y Axis
  svg
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis)

  // UPDATES
  select(".fromapi").on("load", () => {
    setInterval(() => {
      const data = [
        { name: "fir", number: Math.random().toFixed(1) * 50 },
        { name: "sec", number: Math.random().toFixed(1) * 100 },
        { name: "thi", number: Math.random().toFixed(1) * 30 },
        { name: "fou", number: Math.random().toFixed(1) * 100 },
        { name: "fif", number: Math.random().toFixed(1) * 40 },
        { name: "six", number: Math.random().toFixed(1) * 30 },
        { name: "sev", number: Math.random().toFixed(1) * 100 },
        { name: "eig", number: Math.random().toFixed(1) * 40 },
        { name: "nin", number: Math.random().toFixed(1) * 100 },
        { name: "ten", number: Math.random().toFixed(1) * 70 }
      ]

      // X Scale
      xScale.domain(data.map(item => item.name)).range([0, w])

      // Y Scale
      yScale.domain([0, max(data, d => d.number)]).range([h, 0])

      // Barchart
      svg
        .selectAll("rect")
        .data(data)
        .transition()
        .duration(1500)
        .attr("x", (d, i) => (i * w) / data.length)
        .attr("y", d => yScale(d.number))
        .attr("width", w / data.length)
        .attr("height", d => h - yScale(d.number))

      //Axises
      select(".x-axis")
        .transition()
        .duration(1500)
        .call(xAxis)

      select(".y-axis")
        .transition()
        .duration(1500)
        .call(yAxis)
    }, 2000)
  })
}

export default fromapiRender
