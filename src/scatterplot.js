import { select, scaleLinear, max, easeCircleIn } from "d3"

// Dataset
const dataset = [
  [67, 12],
  [49, 90],
  [77, 35],
  [21, 58],
  [6, 22],
  [30, 89],
  [38, 18],
  [78, 100],
  [55, 11],
  [12, 94],
  [69, 1],
  [73, 63],
  [52, 40],
  [12, 20],
  [98, 25],
  [12, 61],
  [79, 13],
  [48, 94],
  [93, 54],
  [50, 20]
]

// metaData
const metaData = [
  { name: "one", color: "red" },
  { name: "two", color: "brown" },
  { name: "three", color: "orange" },
  { name: "four", color: "green" },
  { name: "five", color: "white" },
  { name: "six", color: "black" }
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
  .attr("class", "scatterplot")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// X Scale
const xScale = scaleLinear()
  .domain([0, max(dataset, d => d[0])])
  .range([0, w])

// Y Scale
const yScale = scaleLinear()
  .domain([0, max(dataset, d => d[1])])
  .range([0, h])

// Barchart
const scatterplotRender = () => {
  const g = svg.append("g")

  // Circles
  g.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("fill", "rgba(0,0,0,0.5)")

  // Text metaData
  g.selectAll("text")
    .data(metaData)
    .enter()
    .append("text")
    .text(d => d.name)
    .attr("x", 10)
    .attr("y", (d, i) => i * 22.5)
    .attr("transform", "translate(0, 12)")
    .attr("fill", "#666")
    .attr("font-family", "sans")
    .attr("font-size", "11")

  // metaData
  g.selectAll("rect")
    .data(metaData)
    .enter()
    .append("rect")
    .attr("class", "scatterplot-metadata")
    .attr("x", -20)
    .attr("y", (d, i) => i * 22)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d => d.color)
    .attr("stroke", "#000")
    .attr("cursor", "pointer")
    .on("mouseover", d => {
      g.selectAll("circle")
        .data(dataset)
        .attr("fill", d.color)
        .attr("stroke", "black")
    })
    .on("mouseout", () => {
      g.selectAll("circle")
        .attr("fill", "rgba(0,0,0,0.5)")
        .attr("stroke", "none")
    })

  // Animation
  select(".scatterplot").on("load", () => {
    setInterval(() => {
      const dataset = []
      const arrayLength = 20
      for (let i = 0; i < arrayLength; i++) {
        let arr = []
        let firstIndex = Math.floor(Math.random() * 100)
        let secondIndex = Math.floor(Math.random() * 100)
        arr.push(firstIndex, secondIndex)
        dataset.push(arr)
      }
      g.selectAll("circle")
        .data(dataset)
        .transition()
        .duration(500)
        .ease(easeCircleIn)
        .attr("cx", d => xScale(d[0]))
        .attr("cy", d => yScale(d[1]))
        .attr("r", d => xScale(d[0]) / 10)
    }, 1000)
  })
}

export default scatterplotRender
