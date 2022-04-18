import type { NextPage } from "next";
import { ButtonMinimal, Heading, View } from "@go1d/go1d";
import * as base64 from "base-64";
import { OpenAPIV3 } from "openapi-types";
import Layout from "src/components/layout/Layout";
import Endpoint from "src/components/features/Endpoint";
import { readdir } from "fs/promises";
import { generateLayout, LayoutType } from "src/utils/layout";
import IconText from "@go1d/go1d/build/components/Icons/Text";

interface Props {
  layout: LayoutType;
  endpoint: any;
}

const TagPage: NextPage<Props> = ({ layout, endpoint }) => {
  return (
    <Layout layout={layout}>
      <Heading
        semanticElement="h1"
        visualHeadingLevel="Heading 1"
        marginBottom={4}
        color="accent"
      >
        {endpoint.url}
      </Heading>
      {endpoint.operations.map(
        ({
          url,
          method,
          operation,
        }: {
          url: any;
          method: any;
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
    </Layout>
  );
};

export async function getStaticProps({ params: { api, path } }: any) {
  const { layout, endpoints } = await generateLayout(api);

  const pathId = base64.decode(path);
  const endpoint = endpoints.find((item) => item.url === pathId);

  return {
    props: {
      layout,
      endpoint,
    },
  };
}

export async function getStaticPaths() {
  let paths: any[] = [];

  const files = await readdir("public/apis");
  files.forEach((file) => {
    const api: OpenAPIV3.Document = require(`public/apis/${file}`);
    paths.push(
      ...(Object.keys(api.paths || []).map(
        (path) =>
          `/${file.replace(".json", "")}/endpoints/${base64.encode(path)}`
      ) || [])
    );
  });

  return {
    paths,
    fallback: false,
  };
}

export default TagPage;
