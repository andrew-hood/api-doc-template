import { rest } from "msw";
import { setupServer } from "msw/node";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAPI } from "openapi-types";
import SwaggerParser from "@apidevtools/swagger-parser";
import axios from "axios";
import { transformObject } from "src/utils/transform";
import get from "lodash/get";
import { generateEndpoints } from "src/utils/layout";

export default async function handler(
  { query, body }: NextApiRequest,
  res: NextApiResponse
) {
  const openapi: OpenAPI.Document = await SwaggerParser.dereference(
    require(`public/apis/${query.apiName}.json`)
  );

  const requestHandlers: any[] = [];
  generateEndpoints(openapi).forEach(({ url, operations }) => {
    const tokens = [...url.matchAll(/\{(.+)\}/g)];
    tokens.forEach((token) => {
      var camelCased = token[1].replace(/-([a-z])/g, function (g: string) {
        return g[1].toUpperCase();
      });
      url = url.replace(token[0], `:${camelCased}`);
    });

    operations.forEach((operation: any) => {
      const statusCodes = Object.keys(operation.operation.responses);
      const handler = (rest as any)[operation.method](
        `https://api.backend.dev${url}`,
        (req: any, res: any, ctx: any) => {
          return res(
            ctx.json(
              transformObject(
                get(
                  operation.operation.responses,
                  `${statusCodes[0]}.content.application/json.schema.properties`,
                  {}
                )
              )
            )
          );
        }
      );
      requestHandlers.push(handler);
    });
  });

  const server = setupServer(...requestHandlers);
  server.listen({ onUnhandledRequest: "bypass" });

  let outputs = await Promise.all(
    body.map(async (item: any) => {
      const result = await axios
        .request({
          url: `https://api.backend.dev${item.url}`,
          method: item.method,
          headers: {
            "content-type": "application/json",
          },
          //data: {},
          timeout: 3000,
        })
        .then(({ data }) => ({ data, passed: true }))
        .catch((er) => {
          console.log(er);
          return { data: er.message, passed: false };
        });
      return {
        ...item,
        result: result,
      };
    })
  );

  server.close();

  return res.status(200).json({ message: "success", outputs });
}
