export const RegularPlates = /(?<Region>\w{2})(?<CityNumber>\d{2})-(?<Section2>\d{3})(?<Letter>\w)(?<Section4>\d{2})(-(?<Expire>\d{4}))?/;
export const FreePlates = /(?<Region>\w*)(?<CityNumber>\d{2})-(?<Section2>\d{5})/;
export const MotorbikePlates = /(?<Region>\d{3})-(?<Section2>\d{5})/;