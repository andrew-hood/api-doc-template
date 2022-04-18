import SwaggerParser from "@apidevtools/swagger-parser";
import * as base64 from "base-64";
import { readdir } from "fs/promises";
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import { safeStringify } from "./transform";

interface MenuItemType {
  label: string;
  href: string;
  subitems?: any[];
  tags?: string[];
}

interface Operation {
  url: string;
  method: string;
  operation: any;
}

export interface LayoutType {
  title: string;
  description?: string;
  menu: MenuItemType[];
  apis: string[];
  api: string;
}

export const generateLayout = async (api: string) => {
  const files = await readdir("public/apis");
  const openapi: OpenAPI.Document = await SwaggerParser.dereference(
    require(`public/apis/${api}.json`)
  );

  const endpoints = generateEndpoints(openapi);
  const menu = generateMenu(api, endpoints);
  const layout = {
    title: openapi.info.title,
    description: openapi.info.description,
    apis: files.map((file) => file.replace(".json", "")),
    api,
    menu,
  };

  return {
    openapi,
    endpoints,
    layout,
  };
};

export const generateEndpoints = (api: OpenAPI.Document) => {
  const endpoints: any[] = [];
  Object.entries(api?.paths || {}).forEach(([url, value]) => {
    const tags = new Set();
    const endpoint = {
      url,
      operations: [] as Operation[],
    };
    Object.entries(value as OpenAPIV3.PathItemObject).forEach(
      ([method, path]) => {
        if (["get", "post", "put", "patch", "delete"].indexOf(method) >= 0) {
          endpoint.operations.push({
            url,
            method,
            operation: safeStringify(path, 2),
          });
          ((path as any)?.tags || []).forEach((tag: string) => tags.add(tag));
        }
      }
    );
    endpoints.push({ ...endpoint, tags: Array.from(tags) });
  });
  return endpoints;
};

const generateMenu = (api: string, endpoints: any[]) => {
  const menus: MenuItemType[] = [
    { label: "Introduction", href: `/${api}` },
    { label: "Studio", href: `/${api}/studio` },
  ];

  endpoints?.forEach((endpoint) => {
    endpoint.tags?.map((tag: string) => {
      const index = menus.findIndex((item) => item.label === tag);

      if (index >= 0) {
        (menus[index] as any)?.subitems.push({
          label: endpoint.url,
          href: `/${api}/endpoints/${base64.encode(endpoint.url)}`,
        });
      } else {
        menus.push({
          label: tag,
          href: `/${api}/tags/${tag}`,
          subitems: [
            {
              label: endpoint.url,
              href: `/${api}/endpoints/${base64.encode(endpoint.url)}`,
            },
          ],
        });
      }
    });
    if (endpoint.tags.length === 0) {
      menus.push({
        label: endpoint.url,
        href: `/${api}/endpoints/${base64.encode(endpoint.url)}`,
        subitems: [],
      });
    }
  });

  return menus;
};
