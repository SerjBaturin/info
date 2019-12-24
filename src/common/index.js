import { select } from "d3"

/**
 * getSVG
 *
 * @param {Number} w - svg DOM element width
 * @param {Number} h - svg DOM element hidth
 * @param {String} className - svg DOM element class name
 * @param {Object} param3 - svg DOM element margins
 *
 * @returns {Object} - svg , width, heght
 */

export function getSVG(w, h, className, { margin }) {
  // Inner width & height
  const width = w - margin.left - margin.right
  const height = h - margin.top - margin.bottom

  // Define SVG element
  const svg = select("body")
    .append("svg")
    .attr("class", className)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  return { svg, w, h }
}
