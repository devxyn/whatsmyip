export const parseLocation = (loc: string | undefined) => {
  if (typeof loc !== "string") {
    return { latitude: 0, longitude: 0 };
  }

  const [latitudeStr, longitudeStr] = loc.split(",");
  const latitude = Number(latitudeStr);
  const longitude = Number(longitudeStr);

  if (isNaN(latitude) || isNaN(longitude) || latitudeStr === undefined || longitudeStr === undefined) {
    return { latitude: 0, longitude: 0 };
  }

  return { latitude, longitude };
};

export const parseOrgProvider = (org: string | undefined) => {
  if (typeof org !== "string") return "-";

  return org
    .split(" ")
    .slice(1, org.length - 1)
    .join(" ");
};
