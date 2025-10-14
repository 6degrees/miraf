"use client";

import {useEffect} from "react";
import "leaflet/dist/leaflet.css";

/*
|--------------------------------------------------------------------------
| $props-definition
|--------------------------------------------------------------------------
|
| Defines the props accepted by the MapMiraf component.
| - center: map center coordinates (default: [26.2959, 50.215])
| - iconUrl: path to the image used as the map marker
| - iconSize: width and height of the icon in pixels
| - iconAnchor: anchor point of the icon relative to its size
|
*/
interface MapMirafProps {
    center?: L.LatLngExpression;
    iconUrl?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
}

/*
|--------------------------------------------------------------------------
| $miraf-map
|--------------------------------------------------------------------------
|
| Leaflet-based map styled to match the maroon aesthetic.
| - Uses Carto Dark tiles + CSS filter to achieve maroon tone
| - Zoom and pan interactions fully disabled (static view)
| - Accepts dynamic coordinates and icon via props
| - No API keys required
|
*/
export default function MapMiraf({center = [26.2959, 50.215], iconUrl = "/icons/logo.png", iconSize = [60, 50], iconAnchor = [30, 25]}: MapMirafProps) {
    /*
    |--------------------------------------------------------------------------
    | $map-initialization
    |--------------------------------------------------------------------------
    |
    | Dynamically imports Leaflet only on the client side.
    | - Prevents window-related errors during SSR
    | - Initializes the map with custom coordinates and static view
    | - Adds the provided image marker
    |
    */
    useEffect(() => {
        const init = async () => {
            const L = await import("leaflet");

            const map = L.map("miraf-map", {
                center,
                zoom: 14,
                zoomControl: false,
                attributionControl: false,
                dragging: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
                touchZoom: false,
            });

            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
                { maxZoom: 19 }
            ).addTo(map);

            const icon = L.icon({
                iconUrl,
                iconSize,
                iconAnchor,
            });

            L.marker(center, { icon }).addTo(map);

            return () => {
                map.remove();
            };
        };

        // Only run in the browser
        if (typeof window !== "undefined") {
            init();
        }
    }, [center, iconUrl, iconSize, iconAnchor]);

    /*
    |--------------------------------------------------------------------------
    | $miraf-map-container
    |--------------------------------------------------------------------------
    |
    | Returns the container div that holds the Leaflet map.
    | Styled with rounded corners and overflow hidden to maintain layout shape.
    |
    */
    return (
        <div
            id="miraf-map"
            className="relative h-[280px] md:h-[300px] lg:h-[320px] xl:h-[380px] rounded-3xl overflow-hidden"
        />
    );
}