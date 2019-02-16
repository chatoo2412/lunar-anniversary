import { parseResponse } from "./parsers.js";
import { getNextDate } from "./date.js";
const serviceKey = "yB2GxPS0T1X1yZRcUfVequ9huA3rLjadyg4LYIdEJpOqkP/rdkOBEv69fdKQPe5cz1ZunhDSUJ+Uf7x6cTW2RA==";

const bypassFuckingCorb = async target => fetch(`https://cors-anywhere.herokuapp.com/${target}`);

const get = async (restPath, params = new URLSearchParams()) => {
  params.append("ServiceKey", serviceKey);
  return bypassFuckingCorb(`http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/${restPath}?${params}`).then(response => response.text());
};

export const getNextAnniversary = async (lunMonth, lunDay) => {
  const year = new Date().getFullYear();
  const searchParams = new URLSearchParams({
    fromSolYear: `${year - 1}`,
    toSolYear: `${year + 1}`,
    leapMonth: "평",
    lunMonth: `${lunMonth}`.padStart(2, "0"),
    lunDay: `${lunDay}`.padStart(2, "0")
  });
  const response = await get("getSpcifyLunCalInfo", searchParams).then(parseResponse);
  return getNextDate(response);
};
//# sourceMappingURL=api.js.map