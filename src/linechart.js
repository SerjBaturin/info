import {
  select,
  csv,
  scaleLinear,
  scaleTime,
  min,
  max,
  axisBottom,
  axisLeft,
  timeFormat,
  area
} from "d3"

const margin = { top: 20, right: 10, left: 50, bottom: 20 }

// Inner width & height
const w = 400 - margin.left - margin.right
const h = 300 - margin.top - margin.bottom

const svg = select("body")
  .append("svg")
  .attr("class", "linechart")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

const linechartRender = () => {
  // rowConverter
  const rowConverter = data => ({
    date: new Date(data.date),
    volume: +data.volume,
    open: data.open * 10000,
    high: data.high
  })

  // FETCH DATA
  csv("yahoo.csv").then(data => {
    const dataset = data.map(d => rowConverter(d))

    // SCALES
    const tScale = scaleTime()
      .domain([min(dataset, d => d.date), max(dataset, d => d.date)])
      .range([0, w])
    const xScale = scaleLinear()
      .domain([0, max(dataset, d => d.open)])
      .range([0, w])
    const yScale = scaleLinear()
      .domain([0, max(dataset, d => d.volume)])
      .range([h, 0])

    // AXIS
    const xAxis = axisBottom(tScale)
      .tickPadding(7)
      .tickFormat(timeFormat("%m"))
      .tickSize(-h)
    const yAxis = axisLeft(yScale).tickSize(-w)

    // x Axis CALL
    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${h})`)

    // y Axis CALL
    svg.append("g").call(yAxis)

    // AREA
    const volumeArea = area()
      .x(d => tScale(d.date))
      .y0(h)
      .y1(d => yScale(d.volume))

    // VISUALIZATION
    svg
      .append("g")
      .attr("class", "main-line")
      .append("path")
      .attr("d", volumeArea(dataset))
      .attr("fill", "rgba(255,0,0,.8)")

    svg
      .append("text")
      .text("Yahoo Finance USD volume 2019")
      .attr("font-family", "sans-serif")
      .attr("fill", "rgba(255,0,0,.8)")
      .attr("x", w - 240)
      .attr("y", -5)

    svg.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.2)")
  })

  // END
}
export default linechartRender
