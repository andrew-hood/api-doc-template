import type { NextPage } from "next";
import Link from "next/link";
import { View, Heading, UL, LI } from "@go1d/go1d";
import IconCaretRight from "@go1d/go1d/build/components/Icons/CaretRight";
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import DetailsCard from "src/components/common/card/DetailsCard";
import MarkdownText from "src/components/common/text/MarkdownText";
import Layout from "src/components/layout/Layout";

interface Props {
  info: OpenAPIV3.InfoObject;
  tags?: OpenAPIV3.TagObject[];
  endpoints?: Endpoint[];
}

const Index: NextPage<Props> = ({ info, tags = [], endpoints = [] }) => {
  return (
    <Layout
      title={info.title}
      description={info.description}
      menu={{
        id: "tags",
        items: tags.map((tag) => ({
          href: `/tags/${tag.name}`,
          label: tag.name,
        })),
      }}
    >
      <Heading
        color="default"
        semanticElement="h1"
        visualHeadingLevel="Heading 1"
        marginBottom={5}
      >
        Tags
      </Heading>
      <MarkdownText text={info.description || ""} />

      {tags?.map((tag, index) => (
        <View
          key={index}
          id={tag.name}
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="space-between"
          paddingY={8}
          marginY={8}
          borderTop={1}
          borderColor="faded"
        >
          <View flexBasis={0.45}>
            <Heading
              semanticElement="h3"
              visualHeadingLevel="Heading 3"
              marginBottom={4}
              color="accent"
            >
              <Link href={`/tags/${tag.name}`} passHref>
                {tag.name}
              </Link>
            </Heading>
            <MarkdownText text={tag.description || ""} />
          </View>
          <View flexBasis={0.5}>
            <DetailsCard
              title={`Endpoints`}
              content={
                <UL
                  icon={IconCaretRight}
                  paddingY={0}
                  paddingX={5}
                  fontSize={1}
                >
                  {endpoints
                    .filter((endpoint) => endpoint.tags?.indexOf(tag.name) >= 0)
                    .map((endpoint, index) => (
                      <LI key={index} paddingY={3}>
                        <Link
                          href={`/tags/${tag.name}#${endpoint.operationId}`}
                          passHref
                        >
                          {`${endpoint.method.toUpperCase()} ${endpoint.url}`}
                        </Link>
                      </LI>
                    ))}
                </UL>
              }
            />
          </View>
        </View>
      ))}
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
      tags: api?.tags || null,
      endpoints,
    },
  };
}

export default Index;
