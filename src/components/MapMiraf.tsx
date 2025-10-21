"use client";

import {useEffect, useRef} from "react";
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
export default function MapMiraf(
    {
        center = [26.2959, 50.215],
        iconUrl = "/icons/logo.png",
        iconSize = [60, 50],
        iconAnchor = [30, 25]
    }: MapMirafProps) {

    /*
    |--------------------------------------------------------------------------
    | $refs
    |--------------------------------------------------------------------------
    |
    | Uses React refs to handle map initialization safely:
    | - containerRef  → DOM node that holds the map
    | - mapRef        → stores the Leaflet map instance
    | Prevents re-initialization errors ("Map container is already initialized.")
    |
    */
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);

    /*
    |--------------------------------------------------------------------------
    | $map-initialization
    |--------------------------------------------------------------------------
    |
    | Dynamically imports Leaflet only on the client side.
    | - Prevents window-related errors during SSR
    | - Ensures that map initializes once (even under Strict Mode)
    | - Removes previous map if component remounts
    |
    */
    useEffect(() => {
        let cancelled = false;

        (async () => {
            const L = await import("leaflet");
            if (cancelled || !containerRef.current) return;

            // Cleanup previous instance if it exists
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }

            // Fix Leaflet bug: remove _leaflet_id from the container
            // (Prevents "Map container is already initialized" error)
            // @ts-ignore
            if ((containerRef.current as any)?._leaflet_id) {
                // @ts-ignore
                delete (containerRef.current as any)._leaflet_id;
            }

            // Create map
            const map = L.map(containerRef.current, {
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

            // Apply base tile layer
            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
                {maxZoom: 19}
            ).addTo(map);

            // Create and add marker
            const icon = L.icon({iconUrl, iconSize, iconAnchor});
            L.marker(center, {icon}).addTo(map);

            // Store instance for cleanup
            mapRef.current = map;
        })();

        // Cleanup on unmount
        return () => {
            cancelled = true;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [center, iconUrl, iconSize, iconAnchor]);

    /*
    |--------------------------------------------------------------------------
    | $miraf-map-container
    |--------------------------------------------------------------------------
    |
    | Returns the container <div> that holds the Leaflet map.
    | - Rounded corners and overflow-hidden styling
    | - Responsive height based on screen size
    |
    */
    return (
        <div
            id={'miraf-map'}
            ref={containerRef}
            className="relative h-[45svh] md:h-[45svh] lg:h-[45svh] xl:h-[45svh] rounded-3xl overflow-hidden"
        />
    );
}