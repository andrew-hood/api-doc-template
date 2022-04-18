import { readdir } from "fs/promises";
import { NextPage } from "next";
import { useState } from "react";
import ExecuteTests from "src/components/features/Studio/ExecuteTests";
import Operation from "src/components/features/Studio/Operation";
import Layout from "src/components/layout/Layout";
import { generateLayout } from "src/utils/layout";

interface Props {
  layout: any;
}

const StudioPage: NextPage<Props> = ({ layout }) => {
  const [contracts, setContracts] = useState<any[]>([{ id: `T${Date.now()}` }]);

  const handleAddContract = () => {
    setContracts([
      ...contracts,
      {
        id: `T${Date.now()}`,
      },
    ]);
  };

  const handleUpdateContract = (index: number, item: any) => {
    contracts[index] = item;
    setContracts([...contracts]);

    if (contracts[contracts.length - 1].name) {
      handleAddContract();
    }
  };

  const handleDeleteContract = (index: number) => {
    contracts.splice(index, 1);
    setContracts([...contracts]);

    if (contracts.length === 0) {
      handleAddContract();
    }
  };

  return (
    <Layout
      layout={layout}
      action={<ExecuteTests api={layout.api} contracts={contracts} />}
    >
      {contracts.map((contract, index) => (
        <Operation
          key={contract.id}
          contract={contract}
          onUpdate={(item) => handleUpdateContract(index, item)}
          onDelete={() => handleDeleteContract(index)}
        />
      ))}
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
    paths.push(`/${file.replace(".json", "")}/studio`);
  });

  return {
    paths,
    fallback: false,
  };
}

export default StudioPage;
