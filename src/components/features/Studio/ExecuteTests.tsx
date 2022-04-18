import { Banner, ButtonFilled, Modal, Spinner, Text, View } from "@go1d/go1d";
import axios from "axios";
import { FC, useState } from "react";
import { useModal } from "react-modal-hook";

interface Props {
  api: string;
  contracts: any[];
}

const ExecuteTests: FC<Props> = ({ api, contracts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>();

  const executeContracts = async () => {
    showModal();
    setResults([]);
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `/api/${api}/test`,
        contracts.filter((contract) => contract.name)
      );
      setResults(data.outputs);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const [showModal, hideModal] = useModal(
    () => (
      <Modal title="Test Results" isOpen={true} onRequestClose={hideModal}>
        {isLoading && (
          <View height="100%" alignItems="center" justifyContent="center">
            <Spinner size={8} />
          </View>
        )}
        {results?.map(({ name, result }, index) => (
          <Banner key={index} status={result.passed ? "success" : "danger"}>
            <Text fontWeight="bold">{name}</Text>
            <View>
              <pre>{JSON.stringify(result.data, null, 2)}</pre>
            </View>
          </Banner>
        ))}
      </Modal>
    ),
    [results, isLoading, executeContracts]
  );

  return (
    <ButtonFilled
      marginLeft={3}
      size="sm"
      color="accent"
      onClick={executeContracts}
    >
      Run Tests
    </ButtonFilled>
  );
};

export default ExecuteTests;
