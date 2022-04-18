import { NextPage, NextPageContext } from "next";
import { useState } from "react";
import ExecuteTests from "src/components/features/Studio/ExecuteTests";
import Operation from "src/components/features/Studio/Operation";
import Layout from "src/components/layout/Layout";

interface Props {
  api: string;
  data?: any[];
}

const StudioPage: NextPage<Props> = ({ api, data }) => {
  const [contracts, setContracts] = useState<any[]>(
    data || [{ id: `T${Date.now()}` }]
  );

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
      layout={{ title: "Studio" }}
      action={<ExecuteTests api={api} contracts={contracts} />}
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

export async function getServerSideProps({ query }: NextPageContext) {
  // load contracts

  return {
    props: {
      api: query?.api,
    },
  };
}

export default StudioPage;
