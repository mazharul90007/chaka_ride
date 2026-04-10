import divisionsData from "./bd-divisions.json";

export type District = {
  slug: string;
  name: { en: string; bn: string };
};

export type Division = {
  slug: string;
  name: { en: string; bn: string };
  districts: District[];
};

export const BD_DIVISIONS: Division[] = divisionsData;
