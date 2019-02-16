import { parseDomToJson } from "./utils.js";

const serviceKey =
  "yB2GxPS0T1X1yZRcUfVequ9huA3rLjadyg4LYIdEJpOqkP/rdkOBEv69fdKQPe5cz1ZunhDSUJ+Uf7x6cTW2RA==";

const bypassFuckingCorb = async (target: string) =>
  fetch(`https://cors-anywhere.herokuapp.com/${target}`);

const get = async (restPath: string, params = new URLSearchParams()) => {
  params.append("ServiceKey", serviceKey);

  return bypassFuckingCorb(
    `http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/${restPath}?${params}`
  ).then(response => response.text());
};

const getDates = async (month: number, day: number, leapMonth = "평") => {
  const year = new Date().getFullYear();

  const searchParams = new URLSearchParams({
    fromSolYear: `${year - 2}`,
    toSolYear: `${year + 10}`,
    leapMonth,
    lunMonth: `${month}`.padStart(2, "0"),
    lunDay: `${day}`.padStart(2, "0")
  });

  const response = await get("getSpcifyLunCalInfo", searchParams);

  const dom = new DOMParser().parseFromString(response, "text/xml");

  const { items } = parseDomToJson(dom.querySelector("items")!);

  return items;
};

export { getDates };
