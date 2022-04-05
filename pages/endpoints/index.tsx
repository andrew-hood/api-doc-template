import { Heading } from "@go1d/go1d";
import type { NextPage } from "next";
import * as base64 from "base-64";
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import MarkdownText from "src/components/common/text/MarkdownText";
import Layout from "src/components/layout/Layout";

interface Props {
  info: OpenAPIV3.InfoObject;
  paths?: any[];
}

const EndpointsIndexPage: NextPage<Props> = ({ info, paths = [] }) => {
  return (
    <Layout
      title={info.title}
      description={info.description}
      menu={{
        id: "endpoints",
        items: paths,
      }}
    >
      <Heading
        color="default"
        semanticElement="h1"
        visualHeadingLevel="Heading 1"
        marginBottom={5}
      >
        Endpoints
      </Heading>
      <MarkdownText text={info.description || ""} />
    </Layout>
  );
};

interface Endpoint {
  url: string;
  method: string;
  operationId: string;
  summary: string;
  description: string;
  tags: string[];
}

export async function getStaticProps() {
  const api: OpenAPI.Document = require((process.env as any).API_URL);

  const endpoints: Endpoint[] = [];
  Object.entries(api?.paths || {}).forEach(([url, value]) => {
    Object.entries(value as OpenAPIV3.PathItemObject).forEach(
      ([method, path]) => {
        if (["get", "post", "put", "patch", "delete"].indexOf(method) >= 0) {
          endpoints.push({
            url,
            method,
            operationId: (path as any).operationId || "",
            summary: (path as any).summary || "",
            description: (path as any).description || "",
            tags: (path as any)?.tags || [],
          });
        }
      }
    );
  });

  return {
    props: {
      info: api.info,
      paths: Object.keys(api?.paths || {}).map((key) => ({
        label: key,
        href: `/endpoints/${base64.encode(key)}`,
      })),
      endpoints,
    },
  };
}

export default EndpointsIndexPage;
