import type { NextPage } from "next";
import Layout from "src/components/layout/Layout";
import MarkdownText from "src/components/common/text/MarkdownText";
import { Heading } from "@go1d/go1d";
import { readdir } from "fs/promises";
import { generateLayout } from "src/utils/layout";

interface Props {
  layout: any;
}

const Index: NextPage<Props> = ({ layout }) => {
  return (
    <Layout layout={layout}>
      <Heading
        color="default"
        semanticElement="h1"
        visualHeadingLevel="Heading 1"
        marginBottom={5}
      >
        {layout.title}
      </Heading>
      <MarkdownText text={layout.description || ""} />
    </Layout>
  );
};

export async function getStaticProps({ params: { api } }: any) {
  const { layout } = await generateLayout(api);

  return {
    props: {
      layout,
    },
  };
}

export async function getStaticPaths() {
  let paths: any[] = [];
  const files = await readdir("public/apis");
  files.forEach((file) => {
    paths.push(`/${file.replace(".json", "")}`);
  });

  return {
    paths,
    fallback: false,
  };
}

export default Index;
