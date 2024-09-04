export const RegularPlates = /(?<Region>\w{2})(?<CityNo>\d{2})-(?<Section2>\d{3})(?<Letter>\w)(?<Section1>\d{2})(-(?<Expire>\d{4}))?/;
export const FreePlates = /(?<Region>\w*)(?<CityNumber>\d{2})-(?<Section>\d{5})/;
export const MotorbikePlates = /(?<Section1>\d{3})-(?<Section2>\d{5})/;