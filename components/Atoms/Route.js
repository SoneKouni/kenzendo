import React, { useEffect } from 'react';

const Route = ({ pointA, pointB, setDirections }) => {
    useEffect(() => {
        if (pointA && pointB) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: pointA,
                    destination: pointB,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [pointA, pointB, setDirections]);

    return null;
};

export default Route;