import { ButtonFilled, ButtonMinimal, Heading, Text, View } from "@go1d/go1d";
import IconCross from "@go1d/go1d/build/components/Icons/Cross";
import IconTrash from "@go1d/go1d/build/components/Icons/Trash";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { MethodDropdown, StatusCodeDropdown } from "./Dropdown";

const CodeEditor = dynamic(
  () => import("src/components/features/Studio/CodeEditor"),
  { ssr: false }
);

interface Props {
  contract?: any;
  onUpdate: (item: any) => void;
  onDelete: () => void;
}

const Operation: FC<Props> = ({ contract, onUpdate, onDelete }) => {
  const summaryRef = useRef(contract.data?.summary || "");
  const pathRef = useRef(contract.url || "");

  const handleOnUpdate = (updated: any, key: string) => {
    onUpdate({
      ...contract,
      [key]: updated,
    });
  };

  return (
    <View
      id={contract.id}
      paddingY={7}
      borderBottom={1}
      borderColor="soft"
      css={{
        "[contenteditable=true]": {
          display: "inline-block",
        },
        "[contenteditable=true]:empty:before": {
          content: "attr(placeholder)",
          pointerEvents: "none",
          display: "block",
          color: "#bbb",
        },
      }}
    >
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        marginBottom={2}
      >
        <Heading
          color="default"
          semanticElement="h3"
          visualHeadingLevel="Heading 3"
        >
          <ContentEditable
            html={summaryRef.current}
            onChange={(evt) => {
              summaryRef.current = evt.target.value;
              handleOnUpdate(evt.target.value, "name");
            }}
            placeholder="Add a contract name e.g. create new user"
          />
        </Heading>
        {contract.name && (
          <ButtonMinimal
            color="subtle"
            icon={IconTrash}
            onClick={onDelete}
            size="sm"
          >
            Remove
          </ButtonMinimal>
        )}
      </View>

      {contract.name && (
        <>
          <View marginY={5}>
            <Heading
              semanticElement="h5"
              visualHeadingLevel="Heading 5"
              marginBottom={4}
            >
              When sending{" "}
              <MethodDropdown
                value={contract.method}
                onChange={(value) => handleOnUpdate(value, "method")}
              />{" "}
              to https://api.go1.com
              <Text color="subtle">
                <ContentEditable
                  html={pathRef.current}
                  onChange={(evt) => {
                    pathRef.current = evt.target.value;
                    handleOnUpdate(evt.target.value, "url");
                  }}
                  placeholder="/api_path"
                />
              </Text>
            </Heading>
            {!contract.requestBody ? (
              <View flexDirection="row">
                <ButtonFilled
                  size="sm"
                  color="soft"
                  marginRight={3}
                  onClick={() => handleOnUpdate({}, "requestBody")}
                >
                  Add Request Body
                </ButtonFilled>
              </View>
            ) : (
              <View position="relative">
                <View position="absolute" css={{ top: 0, left: -50 }}>
                  <ButtonFilled
                    color="soft"
                    size="sm"
                    icon={IconCross}
                    onClick={() => handleOnUpdate(null, "requestBody")}
                  />
                </View>
                <CodeEditor
                  key={`request`}
                  title="Request Body"
                  data={contract.requestBody}
                  onUpdate={(value) => handleOnUpdate(value, "requestBody")}
                />
              </View>
            )}
          </View>

          <View marginY={5}>
            <Heading
              semanticElement="h5"
              visualHeadingLevel="Heading 5"
              marginBottom={4}
            >
              Then response should return{" "}
              <StatusCodeDropdown
                value={contract.statusCode}
                onChange={(value) => handleOnUpdate(value, "statusCode")}
              />
            </Heading>
            {!contract.responseObject ? (
              <View flexDirection="row">
                <ButtonFilled
                  size="sm"
                  color="soft"
                  marginRight={3}
                  onClick={() => handleOnUpdate({}, "responseObject")}
                >
                  Add Response Object
                </ButtonFilled>
              </View>
            ) : (
              <View position="relative">
                <View position="absolute" css={{ top: 0, left: -50 }}>
                  <ButtonFilled
                    color="soft"
                    size="sm"
                    icon={IconCross}
                    onClick={() => handleOnUpdate(null, "responseObject")}
                  />
                </View>
                <CodeEditor
                  key={`response`}
                  title="Response Object"
                  data={contract.responseObject}
                  onUpdate={(value) => handleOnUpdate(value, "responseObject")}
                />
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Operation;
