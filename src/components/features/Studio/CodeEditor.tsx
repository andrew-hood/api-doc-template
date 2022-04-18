import { FC, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-one_dark";
import {
  Heading,
  Label,
  ToggleSwitch,
  View,
  Text,
  Modal,
  TextInput,
  foundations,
} from "@go1d/go1d";
import IconAddItem from "@go1d/go1d/build/components/Icons/AddItem";
import ButtonGroup from "src/components/common/button/ButtonGroup";
import { useModal } from "react-modal-hook";
import useAxios from "axios-hooks";
import { transformObject } from "src/utils/transform";
import axios from "axios";

const objectToFields = (object: any, key?: string) => {
  const fields: any = [];
  Object.entries(object)
    .filter(([name]) => {
      return typeof name === "string";
    })
    .forEach(([name, value]) => {
      const identifier = key ? `${key}.${name}` : name;
      fields.push({
        name: identifier,
        type: Array.isArray(value) ? "array" : typeof value,
        required: true,
      });
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === "object"
      ) {
        fields.push(...objectToFields(value[0], identifier));
      } else if (!Array.isArray(value) && typeof value === "object") {
        fields.push(...objectToFields(value, identifier));
      }
    });
  return fields;
};

const COMPONENTS_URL = "/api/go1/components";

interface Props {
  key: string;
  title: string;
  data: any;
  onUpdate: (value: any) => void;
}

const CodeEditor: FC<Props> = ({ key, title, data, onUpdate }) => {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(JSON.stringify(data, null, 2));
  const [fields, setFields] = useState<any[]>([]);

  const handleOnChange = (value: any) => {
    setValue(value);
    try {
      const object = JSON.parse(value);
      setFields(objectToFields(object));
      onUpdate(object);
    } catch (err) {}
  };

  const [{ data: components }] = useAxios(COMPONENTS_URL);

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal title="Components" isOpen={true} onRequestClose={hideModal}>
        <TextInput
          id="search_components"
          placeholder="Search for a component"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        {(components as string[])
          .filter((key) => key.toLowerCase().indexOf(search.toLowerCase()) >= 0)
          .map((key) => (
            <View
              key={key}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              borderColor="delicate"
              borderBottom={1}
              padding={3}
              onClick={async () => {
                const body = await axios
                  .get(`${COMPONENTS_URL}?id=${key}`)
                  .then(({ data }) => data);
                handleOnChange(
                  JSON.stringify(
                    transformObject(body.properties || {}),
                    null,
                    2
                  )
                );
                hideModal();
              }}
              css={{
                cursor: "pointer",
                ":hover": {
                  color: foundations.colors.accent,
                  background: foundations.colors.faint,
                },
              }}
            >
              <Text>{key}</Text>
              <IconAddItem color="accent" />
            </View>
          ))}
      </Modal>
    );
  }, [components, handleOnChange, search, setSearch]);

  return (
    <View
      flexDirection={["column", "column", "row"]}
      justifyContent="space-between"
    >
      <View flexBasis={["auto", "auto", 0.5]}>
        <View height="100%" css={{ backgroundColor: "#282c34" }}>
          <AceEditor
            mode="json"
            theme="one_dark"
            onChange={(value) => handleOnChange(value)}
            name={key}
            editorProps={{ $blockScrolling: true }}
            value={value}
            width="100%"
            fontSize={14}
            tabSize={2}
            highlightActiveLine={false}
            showPrintMargin={false}
            minLines={5}
            maxLines={Infinity}
          />
          <View
            marginTop="auto"
            flexDirection="row-reverse"
            justifyContent="space-between"
            backgroundColor="contrast"
          >
            {/* <ButtonGroup
              items={[{ label: "Save" }, { label: "Save new" }]}
              onClick={(key) => showModal()}
              itemRenderer={(key, item) => item.label}
            /> */}
            <ButtonGroup
              items={[{ label: "Load" }]}
              onClick={(key) => showModal()}
              itemRenderer={(key, item) => item.label}
            />
          </View>
        </View>
      </View>

      <View flexBasis={["auto", "auto", 0.48]}>
        <View
          padding={4}
          backgroundColor="faint"
          borderColor="delicate"
          border={1}
          flexGrow={1}
        >
          <Heading
            semanticElement="h5"
            visualHeadingLevel="Heading 5"
            marginBottom={4}
          >
            {title}
          </Heading>
          {fields?.length > 0 ? (
            <View flexDirection="row" justifyContent="space-between">
              <Label flexBasis={0.6}>Name</Label>
              <Label flexBasis={0.2}>Type</Label>
              <Label flexBasis={0.2}>Required</Label>
            </View>
          ) : (
            <Text fontSize={1}>Empty object</Text>
          )}
          {fields.map((field) => (
            <View
              key={field.name}
              color="default"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              borderColor="delicate"
              paddingY={2}
              borderTop={1}
            >
              <View flexBasis={0.6}>
                <Text ellipsis={true} title={field.name}>
                  {field.name}
                </Text>
              </View>
              <View flexBasis={0.2}>{field.type}</View>
              <View flexBasis={0.2}>
                <ToggleSwitch value={field.required} size="sm"></ToggleSwitch>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CodeEditor;
