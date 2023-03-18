import { RefObject, useEffect, useRef } from 'react'
import { Semicircle } from '@mirei/leaflet-semicircle-ts'
import Leaflet from 'leaflet'

interface ReturnType {
  mapContainer: RefObject<HTMLDivElement>
}

const useGeoreference = (
  lat: number,
  lng: number,
  startAngle: number,
  stopAngle: number,
  radius: number = 650
): ReturnType => {
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainer.current) return
    const map = Leaflet.map(mapContainer.current).setView([lat, lng], 16)
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    Leaflet.circle([lat, lng], {
      fillColor: '#50B8E7',
      fillOpacity: 0.35,
      stroke: false,
      radius
    }).addTo(map)

    Leaflet.circle([lat, lng], {
      fillColor: 'green',
      fillOpacity: 0.3,
      radius: 75,
      stroke: false
    }).addTo(map)
    new Semicircle(
      {
        lat,
        lng
      },
      {
        startAngle,
        stopAngle,
        stroke: false,
        fillColor: 'red',
        radius
      }
    ).addTo(map)

    Leaflet.circle([lat, lng], {
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 1,
      radius: 20
    }).addTo(map)

    return () => {
      map.remove()
    }
  }, [])

  return {
    mapContainer
  }
}

export default useGeoreference
