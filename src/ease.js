import {
  select,
  scaleLinear,
  axisLeft,
  scaleBand,
  axisBottom,
  max,
  easeLinear,
  easeBounce,
  easeCircle
} from "d3"

// Dataset
const dataset = [
  67,
  49,
  77,
  21,
  6,
  30,
  38,
  78,
  55,
  12,
  69,
  73,
  52,
  12,
  98,
  12,
  79,
  48,
  93,
  50
]

// Margin for margin convention
const margin = {
  left: 20,
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
  .attr("class", "ease")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// X Scale
const xScale = scaleLinear()
  .domain([0, max(dataset)])
  .range([0, w])

// X Scale
const yScale = scaleLinear()
  .domain([0, max(dataset)])
  .range([0, h])

// Barchart
const easeRender = () => {
  const g = svg.append("g")

  g.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")

  select(".ease").on("load", () => {
    setInterval(() => {
      const dataset = []
      const arrayLength = 20
      for (let i = 0; i < arrayLength; i++) {
        let newNumber = Math.floor(Math.random() * 100)
        dataset.push(newNumber)
      }

      g.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(500)
        .ease(easeCircle)
        .attr("x", d => w - xScale(d))
        .attr("y", d => h - yScale(d))
        .attr("width", 10)
        .attr("height", d => yScale(d))
        .attr("fill", d => (d > 80 || d < 20 ? "red" : "orange"))
        .attr("stroke", "black")
    }, 1000)
  })
}

export default easeRender
