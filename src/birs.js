import { select, scaleLinear, axisLeft, axisBottom } from "d3"

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
  .attr("class", "birs")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// X Scale
const xScale = scaleLinear()
  .domain([0, w])
  .range([0, w])

// Y Scale
const yScale = scaleLinear()
  .domain([0, h])
  .range([h, 0])

// Barchart
const birs = () => {
  const g = svg.append("g")

  // barWidth
  const barWitdh = 1

  // Animation
  select(".birs").on("load", () => {
    const dataset = []
    setInterval(() => {
      dataset.push(Math.floor(Math.random() * 250))
      g.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .transition()
        .duration(500)
        .attr("x", (d, i) => i * barWitdh)
        .attr("y", d => d)
        .attr("width", barWitdh)
        .attr("height", d => yScale(d))
        .attr("fill", "rgba(0,0,0,.8)")
    }, 500)
  })
  // Axis
  const xAxis = axisBottom(xScale)
  const yAxis = axisLeft(yScale)

  // x Axis
  svg
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${h})`)

  // y Axis
  svg.append("g").call(yAxis)
}

export default birs
