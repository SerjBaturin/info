import { select, scaleLinear, max, axisBottom, axisLeft } from "d3"

// Dataset
const dataset = [100, 50]

// Margin for margin convention
const margin = {
  left: 30,
  right: 30,
  top: 30,
  bottom: 30
}

// Inner width & height
const w = 400 - margin.left - margin.right
const h = 300 - margin.top - margin.bottom

// Define SVG element
const svg = select("body")
  .append("svg")
  .attr("class", "ease")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// X Scale
const xScale = scaleLinear()
  .domain([0, max(dataset)])
  .range([0, w])

// Y Scale
const yScale = scaleLinear()
  .domain([0, max(dataset)])
  .range([0, h])

// xAxisScale
const xAxisScale = scaleLinear()
  .domain([0, dataset.length])
  .range([0, w])

// yAxisScale
const yAxisScale = scaleLinear()
  .domain([0, max(dataset)])
  .range([h, 0])

// Axises
const xAxis = axisBottom(xAxisScale)
const yAxis = axisLeft(yAxisScale)

// x Axis CALL
svg
  .append("g")
  .attr("class", "x-fromapi-axis")
  .call(xAxis)
  .attr("transform", `translate(0, ${h})`)

// y Axis CALL
svg
  .append("g")
  .attr("class", "y-fromapi-axis")
  .call(yAxis)

// EASERENDER ()
const easeRender = () => {
  const g = svg.append("g")

  g.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => (i * w) / dataset.length)
    .attr("y", d => h - yScale(d))
    .attr("width", 20)
    .attr("height", d => yScale(d))
    .attr("stroke", "orange")

  // UPDATES
  select(".ease").on("load", () => {
    setInterval(() => {
      const dataset = []
      const arrayLength = Math.random() * 10
      for (let i = 0; i < arrayLength; i++) {
        let newNumber = Math.floor(Math.random() * 100)
        dataset.push(newNumber)
      }

      // Axises Scale
      xAxisScale.domain([0, dataset.length]).range([0, w])
      yAxisScale.domain([0, max(dataset)]).range([h, 0])

      const bars = g.selectAll("rect").data(dataset)

      bars
        .enter()
        .append("rect")
        .merge(bars)
        .transition()
        .delay((d, i) => (i / dataset.length) * 500)
        .duration(1500)
        .attr("x", (d, i) => (i * w) / dataset.length)
        .attr("y", d => h - yScale(d))
        .attr("width", 20)
        .attr("height", d => yScale(d))
        .attr("stroke", "orange")
      bars
        .exit()
        .transition()
        .duration(500)
        .attr("width", 0)
        .attr("height", 0)
        .remove()

      // Axises
      select(".x-fromapi-axis")
        .transition()
        .duration(500)
        .call(xAxis)
      select(".y-fromapi-axis")
        .transition()
        .duration(500)
        .call(yAxis)
    }, 3000)
  })
}

export default easeRender
