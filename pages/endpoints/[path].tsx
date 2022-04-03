import type { NextPage } from "next";
import { Heading } from "@go1d/go1d";
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import SwaggerParser from "@apidevtools/swagger-parser";
import Layout from "src/components/layout/Layout";
import Endpoint from "src/components/features/Endpoint";
import { safeStringify } from "src/services/utils";

interface EndpointType {
  path: string;
  method: string;
  operation: OpenAPIV3.OperationObject;
}

interface Props {
  info: OpenAPIV3.InfoObject;
  paths: any[];
  path: string;
  endpoints: EndpointType[];
}

const TagPage: NextPage<Props> = ({ info, paths, path, endpoints }) => {
  return (
    <Layout
      title={`${path} | ${info.title}`}
      menu={{
        id: "endpoints",
        items: paths,
      }}
    >
      <Heading
        semanticElement="h1"
        visualHeadingLevel="Heading 1"
        marginBottom={4}
        color="accent"
      >
        {path}
      </Heading>
      {endpoints.map((endpoint) => (
        <Endpoint
          key={endpoint.path + "-" + endpoint.method}
          path={endpoint.path}
          method={endpoint.method}
          operation={endpoint.operation}
        />
      ))}
    </Layout>
  );
};

export async function getStaticProps({ params: { path } }: any) {
  const api: OpenAPI.Document = await SwaggerParser.dereference(
    require((process.env as any).API_URL)
  );

  const pathId = atob(path);

  const endpoints: EndpointType[] = [];
  Object.entries(
    (api.paths as any)[pathId] as OpenAPIV3.PathItemObject
  ).forEach(([method, operation]) => {
    if (["get", "post", "put", "patch", "delete"].indexOf(method) >= 0) {
      endpoints.push({
        path: pathId,
        method,
        operation: safeStringify(operation, 2),
      });
    }
  });

  return {
    props: {
      info: api.info,
      paths: Object.keys(api?.paths || {}).map((key) => ({
        label: key,
        href: `/endpoints/${btoa(key)}`,
      })),
      path: pathId,
      endpoints,
    },
  };
}

export async function getStaticPaths() {
  const api: OpenAPIV3.Document = require((process.env as any).API_URL);
  const paths =
    Object.keys(api.paths).map((path) => {
      return `/endpoints/${btoa(path)}`;
    }) || [];

  return {
    paths,
    fallback: false,
  };
}

export default TagPage;
