/**
 * Browser Types Definition
 * Defines supported browsers and device types
 */

export enum BrowserTypes {
  CHROME = 'chrome',
  FIREFOX = 'firefox',
  EDGE = 'edge',
}

export enum DeviceTypes {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
}

// Mobile device configurations
export const MobileDevices = {
  iPhone13: {
    width: 390,
    height: 844,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
  },
  iPad: {
    width: 768,
    height: 1024,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
  },
  PixelXL: {
    width: 411,
    height: 823,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel XL) AppleWebKit/537.36',
  },
};
