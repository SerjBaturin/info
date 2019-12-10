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

// Data
const dataset = [
  { gen: "female", name: "Jane", age: 25, cause: "murder" },
  { gen: "female", name: "Lora", age: 13, cause: "heart attack" },
  { gen: "female", name: "Kim", age: 48, cause: "cancer" },
  { gen: "male", name: "Alan", age: 60, cause: "suicide" },
  { gen: "male", name: "John", age: 31, cause: "murder" },
  { gen: "male", name: "Serj", age: 40, cause: "heart attack" },
  { gen: "female", name: "Maloa", age: 70, cause: "cancer" },
  { gen: "female", name: "Anna", age: 18, cause: "murder" },
  { gen: "female", name: "Ira", age: 28, cause: "suicide" },
  { gen: "female", name: "Elen", age: 34, cause: "suicide" },
  { gen: "male", name: "Bertran", age: 58, cause: "cancer" },
  { gen: "male", name: "Silver", age: 42, cause: "murder" },
  { gen: "female", name: "Winter", age: 38, cause: "murder" }
]

// Margin for margin convention
const margin = {
  left: 60,
  right: 10,
  top: 30,
  bottom: 30
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

// X Scale
const xScale = scaleLinear()
  .domain([0, max(dataset, d => d.age)])
  .range([0, w])

// Y Scale
const yScale = scaleBand()
  .domain(dataset.map(d => d.name))
  .range([0, h])

// Barchart's colors
const barchartColor = d => {
  switch (d.cause) {
    case "murder":
      return "black"
    case "cancer":
      return "red"
    case "heart attack":
      return "blue"
    case "suicide":
      return "yellow"
    default:
      return "steelblue"
  }
}

// Barchart
const causeRender = () => {
  const g = svg.append("g")

  g.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", d => yScale(d.name))
    .attr("width", d => xScale(d.age))
    .attr("height", h / dataset.length)
    .attr("fill", d => barchartColor(d))

  // Axis
  const xAxis = axisBottom(xScale)
  const yAxis = axisLeft(yScale)

  // x Axis
  svg
    .append("g")
    .attr("class", "axis")
    .call(xAxis)
    .attr("transform", `translate(0, ${h})`)

  // y Axis
  svg
    .append("g")
    .attr("class", "axis")
    .call(yAxis)
}

export default causeRender
