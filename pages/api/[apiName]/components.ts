import SwaggerParser from "@apidevtools/swagger-parser";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAPI } from "openapi-types";
import { safeStringify } from "src/utils/transform";

export default async function handler(
  { query }: NextApiRequest,
  res: NextApiResponse
) {
  const openapi: OpenAPI.Document = await SwaggerParser.dereference(
    require(`public/apis/${query.apiName}.json`)
  );

  if (query.id) {
    const component = safeStringify(
      (openapi as any).components?.schemas[query.id as string]
    );
    return res.status(200).json(component);
  }

  const components = Object.keys((openapi as any).components?.schemas);
  return res.status(200).json(components);
}
