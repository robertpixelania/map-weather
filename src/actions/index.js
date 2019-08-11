export const selectLocation = (location) => {
    return {
        type: 'UPDATE_LOCATION',
        payload: location
    }
};

export const updateMarker = (marker) => {
    return {
        type: 'UPDATE_MARKER',
        payload: marker
    }
};