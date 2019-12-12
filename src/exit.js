import { select, scaleLinear, axisLeft, axisBottom, max } from "d3"

const margin = { top: 20, right: 20, left: 40, bottom: 20 }

const w = 400
const h = 300

const dataset = [50, 100, 60, 20, 10, 80, 40]

const svg = select("body")
  .append("svg")
  .attr("class", "exit")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

const xScale = scaleLinear()
  .domain([0, max(dataset)])
  .range([0, w])

const yScale = scaleLinear()
  .domain([0, h])
  .range([h, 0])

const xAxis = axisBottom(xScale)
const yAxis = axisLeft(yScale)

svg
  .append("g")
  .attr("class", "x-exit-axis")
  .call(xAxis)
  .attr("transform", `translate(0, ${h})`)

svg
  .append("g")
  .attr("class", "y-exit-axis")
  .call(yAxis)

const barWidth = 11

svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => xScale(d) - barWidth / 2)
  .attr("y", d => yScale(d))
  .attr("width", barWidth)
  .attr("height", d => h - yScale(d))
  .attr("fill", "orange")

const exitRender = () => {
  select(".exit").on("load", () => {
    setInterval(() => {
      const data = []

      const arrayLength = Math.random().toFixed(1) * 10
      for (let i = 0; i < arrayLength; i++) {
        data.push(Math.random().toFixed(1) * 100)
      }
      console.log(data)
      const bars = svg.selectAll("rect").data(data)

      xScale.domain([0, max(data)]).range([0, w])

      yScale.domain([0, max(data)]).range([h, 0])

      bars
        .enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x", (d, i) => xScale(d) - 10)
        .attr("y", d => yScale(d))
        .attr("width", 20)
        .attr("height", d => h - yScale(d))
        .attr("fill", "rgba(0,0,0,.3)")
      bars
        .exit()
        .transition()
        .duration(500)
        .attr("y", -h)
        .remove()

      select(".x-exit-axis")
        .transition()
        .duration(200)
        .call(xAxis)
        .attr("transform", `translate(0, ${h})`)

      select(".y-exit-axis")
        .transition()
        .duration(200)
        .call(yAxis)
    }, 1000)
  })
}

export default exitRender
