import { select, pie, arc, max, ascending, descending, entries } from "d3"

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
  .attr("class", "arcs")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// circleRender for EXPORT
const circlesRender = () => {
  // Dataset
  const dataset = [
    { day: "Mon", size: 35 },
    { day: "Tue", size: 47 },
    { day: "Wed", size: 16 },
    { day: "Thu", size: 58 },
    { day: "Fri", size: 2 },
    { day: "Sat", size: 71 },
    { day: "Sun", size: 8 }
  ]

  const size = pie()(dataset.map(d => d.size))

  const outerRadius = w / 3
  const innerRadius = 0
  const ARC = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  svg
    .selectAll("g.arcas")
    .data(size)
    .enter()
    .append("g")
    .attr("transform", `translate(${w / 2}, ${h / 2})`)
    .append("path")
    .attr("fill", (d, i) => `rgba(0,0,0,0.${i + 1})`)
    .attr("d", (d, i) => ARC(d, i))

  select(".arcs").on("click", () => {
    // Dataset
    const dataset = [
      { day: "Mon", size: Math.random().toFixed(1) * 10 },
      { day: "Tue", size: Math.random().toFixed(1) * 10 },
      { day: "Wed", size: Math.random().toFixed(1) * 10 },
      { day: "Thu", size: Math.random().toFixed(1) * 10 },
      { day: "Fri", size: Math.random().toFixed(1) * 10 },
      { day: "Sat", size: Math.random().toFixed(1) * 10 },
      { day: "Sun", size: Math.random().toFixed(1) * 10 }
    ]

    const size = pie()(dataset.map(d => d.size))
    const arcs = svg.selectAll("g.arcas").data(size)
    arcs
      .enter()
      .append("g")
      .merge(arcs)
      .attr("transform", `translate(${w / 2}, ${h / 2})`)
      .append("path")
      .merge(arcs)
      .attr("fill", (d, i) => `rgba(0,0,0,0.${i + 1})`)
      .attr("d", (d, i) => ARC(d, i))
    arcs.exit().remove()
  })
}

export default circlesRender
