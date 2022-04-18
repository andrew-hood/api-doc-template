import type { NextPage } from "next";
import { Heading } from "@go1d/go1d";
import { OpenAPIV3 } from "openapi-types";
import MarkdownText from "src/components/common/text/MarkdownText";
import Layout from "src/components/layout/Layout";
import Endpoint from "src/components/features/Endpoint";
import { readdir } from "fs/promises";
import { generateLayout } from "src/utils/layout";

interface Props {
  layout: any;
  tag: OpenAPIV3.TagObject;
  endpoints: any;
}

const TagPage: NextPage<Props> = ({ layout, tag, endpoints }) => {
  return (
    <Layout layout={layout}>
      <Heading
        semanticElement="h1"
        visualHeadingLevel="Heading 1"
        marginBottom={4}
        color="accent"
      >
        {tag.name}
      </Heading>
      <MarkdownText text={tag.description || ""} />
      {endpoints.map(({ operations }: { operations: any[] }) => (
        <>
          {operations.map(
            ({
              url,
              method,
              operation,
            }: {
              url: string;
              method: string;
              operation: any;
            }) => (
              <Endpoint
                key={url + "-" + method}
                path={url}
                method={method}
                operation={operation}
              />
            )
          )}
        </>
      ))}
    </Layout>
  );
};

export async function getStaticProps({ params: { api, tag } }: any) {
  let { layout, endpoints, openapi } = await generateLayout(api);
  endpoints = endpoints.filter((endpoint) => endpoint.tags.indexOf(tag) >= 0);

  return {
    props: {
      layout,
      tag: openapi.tags?.find(({ name }) => name === tag),
      endpoints,
    },
  };
}

export async function getStaticPaths() {
  let paths: any[] = [];
  const files = await readdir("public/apis");
  files.forEach((file) => {
    const api: OpenAPIV3.Document = require(`public/apis/${file}`);
    paths.push(
      ...(api.tags?.map(
        (tag) => `/${file.replace(".json", "")}/tags/${tag.name}`
      ) || [])
    );
  });

  return {
    paths,
    fallback: false,
  };
}

export default TagPage;
