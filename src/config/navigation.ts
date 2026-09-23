export interface NavigationItem {
  key: string;
  path: `/${string}`;
  isContentType: boolean;
}

// 分类 slug 与 content/<locale>/ 下的文章子目录一一对应（来源：关键词.json categories）
export const NAVIGATION_CONFIG = [
  { key: "codes", path: "/codes", isContentType: true },
  { key: "rods", path: "/rods", isContentType: true },
  { key: "enchants", path: "/enchants", isContentType: true },
  { key: "values", path: "/values", isContentType: true },
  { key: "relics", path: "/relics", isContentType: true },
  { key: "guide", path: "/guide", isContentType: true },
  { key: "locations", path: "/locations", isContentType: true },
  { key: "creatures", path: "/creatures", isContentType: true },
] satisfies readonly NavigationItem[];

export const CONTENT_TYPES: string[] = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
