/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'

import { zoom as d3Zoom } from 'd3-zoom'
// import { drag as d3Drag } from 'd3-drag'
import { select } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale'
import {
  forceLink as d3ForceLink,
  forceManyBody as d3ForceManyBody,
  forceSimulation as d3ForceSimulation,
  forceX as d3ForceX,
  forceY as d3ForceY
} from 'd3-force'

interface Link {
  start_node: string | number
  end_node: string | number
  type: string | number
}
interface Node {
  node_name?: string
  type?: string | number
  text?: string
}
interface Props {
  links: Link[]
  nodes: Node[]
  colors?: string[]
}
const Nodes = (props: Props): ReactElement => {
  const { colors = ['#A57865', '#366071'] } = props
  const svgRef = useRef<SVGSVGElement>(null)
  const [zoomTransform, setZoomTransform] = useState(null)

  const width = 1000
  const height = 800

  const zoom = useMemo(
    () =>
      d3Zoom()
        // .scaleExtent([1, 8])
        .scaleExtent([-5, 5])
        // .translateExtent([
        //   [-100, -100],
        //   [width + 100, height + 100],
        // ])
        // .extent([
        //   [-100, -100],
        //   [width + 100, height + 100],
        // ])
        .filter((event) => {
          if (event.type === 'wheel') return event.ctrlKey

          return true
        })
        .on('zoom', (event) => {
          setZoomTransform(event.transform)
          if (event.type === 'wheel') {
            event.preventDefault()
            event.stopImmediatePropagation()
          }
        }),
    []
  )

  useEffect(() => {
    select(svgRef.current)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('width', width)
      .attr('height', height)
      .style('font', '12px sans-serif')
      .attr(
        'style',
        'max-width: 100%; height: auto; height: intrinsic; width: 100%'
      )
      .call(zoom as any)
    // .on("wheel.zoom", null);
  }, [])

  useEffect(() => {
    select(svgRef.current).select('g').attr('transform', zoomTransform)
  }, [zoomTransform])

  // const handleDrag = (simulation): any => {
  //   const dragstarted = (event, d): void => {
  //     if (!event.active) simulation.alphaTarget(0.3).restart()
  //     d.fx = d.x
  //     d.fy = d.y
  //   }

  //   const dragged = (event, d): void => {
  //     d.fx = event.x
  //     d.fy = event.y
  //   }

  //   const dragended = (event, d): void => {
  //     if (!event.active) simulation.alphaTarget(0)
  //     d.fx = null
  //     d.fy = null
  //   }

  //   return d3Drag()
  //     .on('start', dragstarted)
  //     .on('drag', dragged)
  //     .on('end', dragended)
  // }

  useEffect(() => {
    const radio = 10
    // const DISTANCES = { AUDIO: 70, SIMILAR: 30 }

    const links = props.links.map((d) =>
      Object.create({
        ...d,
        source: d.start_node,
        endource: d.start_node,
        target: d.end_node
        // distance: DISTANCES[d.type]
      })
    )
    const nodes = props.nodes.map((d) =>
      Object.create({ id: d.node_name, type: d.type, text: d.text })
    )
    const types = Array.from(new Set(nodes.map((d) => d.type)))

    const color = scaleOrdinal(types, colors)

    const forceLink = d3ForceLink(links)
      .id((d: any) => d.id)
      .distance((d) => d.distance)
    const forceNode = d3ForceManyBody().strength(-400)

    const simulation = d3ForceSimulation(nodes)
      .force('link', forceLink)
      .force('charge', forceNode)
      .force('x', d3ForceX())
      .force('y', d3ForceY())

    select(svgRef.current).selectAll('*').remove()

    const svg = select(svgRef.current).append('g')

    const link = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 0.5)
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('stroke', '#0000007a')

    const node = svg
      .append('g')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g')
      .data(nodes)
      .join('g')

    node
      .append('circle')
      .attr('stroke', 'white')
      .style('stroke-opacity', '0')
      .attr('fill', (d) => color(d.type))
      .attr('stroke-width', 1.5)
      .attr('r', radio)
    // .call(handleDrag(simulation))

    node
      .append('text')
      .style('font-size', '6px')
      .attr('x', 0)
      .attr('y', radio + 6)
      .text((d) => d.text)
      .clone(true)
      .lower()
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 1)

    simulation.on('tick', () => {
      link.attr('d', (d: any) => {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)

        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `
      })
      node.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })
  }, [props])

  return <svg ref={svgRef} />
}

export default Nodes
