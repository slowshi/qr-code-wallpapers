import { Options as QRCodeStylingOptions } from 'qr-code-styling'

export interface PhoneModel {
  model: string
  width: number
  height: number
}

export const phoneModels: PhoneModel[] = [
  {
    model: 'iPhone 13',
    width: 1170,
    height: 2532,
  },
  {
    model: 'iPhone 13 Max',
    width: 1284,
    height: 2778,
  },
  {
    model: 'iPhone 13 Mini',
    width: 1080,
    height: 2340,
  },
  {
    model: 'Samsung S23 Ultra',
    width: 1440,
    height: 3088,
  },
  {
    model: 'Samsung S23',
    width: 1080,
    height: 2340,
  },
  {
    model: 'Pixel 6A',
    width: 1080,
    height: 2400,
  },
  {
    model: 'Pixel 7 Pro',
    width: 1440,
    height: 3120,
  },
]
export const palette: { [key: string]: string } = {
  PURPLE_100: '#C5C5FF',
  PURPLE_200: '#A4A4F4',
  BLUE_100: '#BBEFFF',
  BLUE_200: '#99E2FF',
  BLUE_300: '#80B1FF',
  GREEN_100: '#B3FFC7',
  GREEN_200: '#79E8B3',
  ORANGE_100: '#FFCC99',
  YELLOW_100: '#FFE98A',
  PINK_100: '#FFD2EA',
  PINK_200: '#FFC2DF',
  PINK_300: '#FFA4D4',
}
export const defaultStyling: QRCodeStylingOptions = {
  width: 1200,
  height: 1200,
  data: 'https://www.doodles.app',
  margin: 0,
  type: 'svg',
  qrOptions: { typeNumber: 4, mode: 'Byte', errorCorrectionLevel: 'L' },
  imageOptions: { hideBackgroundDots: true, imageSize: 1, margin: 3, crossOrigin: 'anonymous' },
  dotsOptions: { type: 'classy-rounded', color: '#424242' },
  backgroundOptions: { color: '#00000000' },
}
export interface DoodleAttribute {
  trait_type: string
  value: string
}
export interface DoodleMetadata {
  image: string
  name: string
  description: string
  attributes: DoodleAttribute[]
}
export const IPFS_URL = 'https://wcnft.mypinata.cloud/ipfs'
export const DOODLE_METADATA_URL = `${IPFS_URL}/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS`
