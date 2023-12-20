export const convertARGBToHex = (color: string) => {
  if (color.length > 7) {
    return `${"#" + color.slice(3, 9) + color[1] + color[2]}`;
  } else {
    return color;
  }
};

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

export const leadingZerosPadding = (n: number) => {
  return n < 10 ? "0" + n : n;
};

export const dateFormatter = (date: Date) => {
  return `${leadingZerosPadding(date.getDate())}-${leadingZerosPadding(
    date.getMonth() + 1
  )}-${date.getFullYear()}`;
};

export const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
