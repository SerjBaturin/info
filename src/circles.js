import { select, csv, pie, arc } from "d3"

// Margin for margin convention
const margin = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

// Inner width & height
const w = 400 - margin.left - margin.right
const h = 300 - margin.top - margin.bottom

// Define SVG element
const svg = select("body")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// circleRender for EXPORT
const circlesRender = () => {
  // Render
  const render = data => {
    const PIE = pie().sort(null)
    const outerRadius = w / 3
    const innerRadius = 0
    const ARC = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    const arcs = svg
      .selectAll("g.arc")
      .data(PIE(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")")
    arcs
      .append("path")
      .attr("fill", (d, i) => `rgba(89,89,89,0.${i + 1})`)
      .attr("d", (d, i) => ARC(d, i))
    arcs
      .append("text")
      .attr("transform", d => "translate(" + ARC.centroid(d) + ")")
      .attr("text-anchor", "middle")
      .style("fill", "#000")
      .text(d => d.value)
  }

  // Recieving data & call render
  csv("data.csv").then(data => {
    const arr = []
    data.forEach(data => {
      data.value = +data.value / 1000
      arr.push(data.value)
    })
    render(arr)
  })
}

export default circlesRender
