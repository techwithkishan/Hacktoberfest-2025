import axios from 'axios';

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  timezone: string;
  accuracy: number;
  source: 'gps' | 'ip';
}

class GeolocationService {
  private ipApiUrl = 'http://ip-api.com/json';
  private fallbackLocation = {
    latitude: 37.7749,
    longitude: -122.4194,
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    countryCode: 'US',
    timezone: 'America/Los_Angeles',
    accuracy: 50,
    source: 'ip' as const
  };

  async getCurrentLocation(): Promise<LocationData> {
    try {
      // First try to get GPS location
      const gpsLocation = await this.getGPSLocation();
      if (gpsLocation) {
        return gpsLocation;
      }
    } catch (error) {
      console.warn('GPS location failed, falling back to IP location:', error);
    }

    try {
      // Fallback to IP-based location
      const ipLocation = await this.getIPLocation();
      return ipLocation;
    } catch (error) {
      console.warn('IP location failed, using fallback location:', error);
      return this.fallbackLocation;
    }
  }

  private async getGPSLocation(): Promise<LocationData | null> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude, accuracy } = position.coords;
            
            // Reverse geocoding to get address details
            const addressData = await this.reverseGeocode(latitude, longitude);
            
            resolve({
              latitude,
              longitude,
              city: addressData.city || 'Unknown',
              state: addressData.state || 'Unknown',
              country: addressData.country || 'Unknown',
              countryCode: addressData.countryCode || 'US',
              timezone: addressData.timezone || 'UTC',
              accuracy: accuracy || 100,
              source: 'gps'
            });
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(new Error(this.getGeolocationErrorMessage(error)));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  private async getIPLocation(): Promise<LocationData> {
    try {
      const response = await axios.get(this.ipApiUrl);
      const data = response.data;

      if (data.status === 'fail') {
        throw new Error(data.message || 'IP geolocation failed');
      }

      return {
        latitude: data.lat,
        longitude: data.lon,
        city: data.city || 'Unknown',
        state: data.regionName || 'Unknown',
        country: data.country || 'Unknown',
        countryCode: data.countryCode || 'US',
        timezone: data.timezone || 'UTC',
        accuracy: 50, // IP-based location is less accurate
        source: 'ip'
      };
    } catch (error) {
      console.error('IP geolocation error:', error);
      throw new Error('Failed to get location from IP');
    }
  }

  private async reverseGeocode(latitude: number, longitude: number) {
    try {
      // Using a free reverse geocoding service
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      const data = response.data;
      return {
        city: data.locality || data.city,
        state: data.principalSubdivision || data.state,
        country: data.countryName,
        countryCode: data.countryCode,
        timezone: data.localityInfo?.administrative?.[0]?.timezone || 'UTC'
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        city: 'Unknown',
        state: 'Unknown',
        country: 'Unknown',
        countryCode: 'US',
        timezone: 'UTC'
      };
    }
  }

  private getGeolocationErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location access denied by user';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable';
      case error.TIMEOUT:
        return 'Location request timed out';
      default:
        return 'An unknown error occurred while retrieving location';
    }
  }

  async getLocationFromAddress(address: string): Promise<LocationData | null> {
    try {
      // Using a free geocoding service
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/forward-geocode-client?query=${encodeURIComponent(address)}&localityLanguage=en`
      );
      
      const data = response.data;
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          latitude: result.latitude,
          longitude: result.longitude,
          city: result.locality || 'Unknown',
          state: result.principalSubdivision || 'Unknown',
          country: result.countryName || 'Unknown',
          countryCode: result.countryCode || 'US',
          timezone: result.localityInfo?.administrative?.[0]?.timezone || 'UTC',
          accuracy: 100,
          source: 'ip'
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  formatLocation(location: LocationData): string {
    return `${location.city}, ${location.state}, ${location.country}`;
  }
}

export const geolocationService = new GeolocationService();

