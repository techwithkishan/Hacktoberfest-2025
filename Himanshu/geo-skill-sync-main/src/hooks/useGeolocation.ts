import { useState, useEffect } from 'react';

interface GeolocationState {
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  isLoading: boolean;
  error: string | null;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const useGeolocation = (options: GeolocationOptions = {}) => {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    isLoading: false,
    error: null,
  });

  const getCurrentPosition = () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        isLoading: false,
        error: 'Geolocation is not supported by this browser.',
      });
      return;
    }

    const success = (position: GeolocationPosition) => {
      setState({
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        isLoading: false,
        error: null,
      });
    };

    const error = (error: GeolocationPositionError) => {
      let errorMessage = 'An unknown error occurred.';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access denied by user.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out.';
          break;
      }
      setState({
        coordinates: null,
        isLoading: false,
        error: errorMessage,
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
      ...options,
    });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return {
    ...state,
    getCurrentPosition,
  };
};