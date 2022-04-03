import type { NextPage } from "next";
import { Heading } from "@go1d/go1d";
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import SwaggerParser from "@apidevtools/swagger-parser";
import MarkdownText from "src/components/common/text/MarkdownText";
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
  tags: OpenAPIV3.TagObject[];
  tag: OpenAPIV3.TagObject;
  endpoints: EndpointType[];
}

const TagPage: NextPage<Props> = ({ info, tags, tag, endpoints }) => {
  return (
    <Layout
      title={`${tag.name} | ${info.title}`}
      description={tag.description}
      menu={{
        id: "tags",
        items: tags.map((tag) => ({
          href: `/tags/${tag.name}`,
          label: tag.name,
        })),
      }}
    >
      <Heading
        semanticElement="h1"
        visualHeadingLevel="Heading 1"
        marginBottom={4}
        color="accent"
      >
        {tag.name}
      </Heading>
      <MarkdownText text={tag.description || ""} />
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

export async function getStaticProps({ params: { tag } }: any) {
  const api: OpenAPI.Document = await SwaggerParser.dereference(
    require((process.env as any).API_URL)
  );

  const endpoints: EndpointType[] = [];
  Object.entries(api?.paths || {}).forEach(([path, value]) => {
    Object.entries(value as OpenAPIV3.PathItemObject).forEach(
      ([method, operation]) => {
        if (
          ["get", "post", "put", "patch", "delete"].indexOf(method) >= 0 &&
          (operation as any).tags?.indexOf(tag) >= 0
        ) {
          endpoints.push({
            path,
            method,
            operation: safeStringify(operation, 2),
          });
        }
      }
    );
  });

  return {
    props: {
      info: api.info,
      tags: api.tags,
      tag: api.tags?.find(({ name }) => name === tag),
      endpoints,
    },
  };
}

export async function getStaticPaths() {
  const api: OpenAPIV3.Document = require((process.env as any).API_URL);
  const paths = api.tags?.map((tag) => `/tags/${tag.name}`) || [];

  return {
    paths,
    fallback: false,
  };
}

export default TagPage;
