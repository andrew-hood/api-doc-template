import type { NextPage } from "next";
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import Layout from "src/components/layout/Layout";
import MarkdownText from "src/components/common/text/MarkdownText";
import { Heading } from "@go1d/go1d";

interface Props {
  info: OpenAPIV3.InfoObject;
}

const Index: NextPage<Props> = ({ info }) => {
  return (
    <Layout title={info.title} description={info.description}>
      <Heading
        color="default"
        semanticElement="h1"
        visualHeadingLevel="Heading 1"
        marginBottom={5}
      >
        {info.title}
      </Heading>
      <MarkdownText text={info.description || ""} />
    </Layout>
  );
};

export async function getStaticProps() {
  const api: OpenAPI.Document = require((process.env as any).API_URL);

  return {
    props: {
      info: api.info,
    },
  };
}

export default Index;
