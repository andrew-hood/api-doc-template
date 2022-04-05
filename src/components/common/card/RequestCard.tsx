import {
  ButtonMinimal,
  Modal,
  NotificationManager,
  Text,
  View,
} from "@go1d/go1d";
import IconCopy from "@go1d/go1d/build/components/Icons/Copy";
import IconVideoplay from "@go1d/go1d/build/components/Icons/Videoplay";
import dynamic from "next/dynamic";
import React, { FC, useEffect, useState } from "react";
import { useModal } from "react-modal-hook";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { OpenAPIV3 } from "openapi-types";
import BaseCard from "./BaseCard";
import ButtonGroup from "src/components/common/button/ButtonGroup";
import HttpClient from "src/services/httpClient";
import { useSelector } from "react-redux";

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter"));

interface Props {
  path: string;
  method: string;
  operationObject: OpenAPIV3.OperationObject;
  initialLanguage?: string;
}

const LANGUAGE_OPTIONS = {
  curl: { label: "cURL", syntax: "bash" },
  js: { label: "JS", syntax: "javascript" },
  php: { label: "PHP", syntax: "php" },
};

const RequestCard: FC<Props> = ({
  path,
  method,
  operationObject,
  initialLanguage,
}) => {
  const auth: any = useSelector<any>((state) => state.auth.value);
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState(initialLanguage || "curl");

  useEffect(() => {
    const httpClient = new HttpClient(
      "https://api.go1.com",
      auth?.access_token || "****************"
    );

    switch (language) {
      case "curl":
        setContent(httpClient.convertToCurl(path, method, operationObject));
        break;
      case "js":
        httpClient.convertToCurl(path, method, operationObject);
        setContent(`Not available`);
        break;
      case "php":
        httpClient.convertToCurl(path, method, operationObject);
        setContent(`Not available`);
        break;
    }
  }, [language, method, operationObject, path, auth]);

  const [showModal, hideModal] = useModal(() => (
    <Modal isOpen={true} onRequestClose={hideModal} title="Edit">
      test
    </Modal>
  ));

  const handleCopyCode = () => {
    var copyText: any = document.getElementById(`${method}_${path}_code`);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    document.execCommand("copy");

    NotificationManager.success({
      message: <Text>Snippet copied</Text>,
      options: {
        lifetime: 3000,
        isOpen: true,
      },
    });
  };

  const handleSendRequest = async () => {
    const httpClient = new HttpClient(
      "https://api.go1.com",
      auth?.access_token
    );
    const data = await httpClient
      .sendRequest(path, method, operationObject)
      .catch((err) => err.message);
    setContent(content + `\n# Response\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <BaseCard
      mode="dark"
      maxHeight="60vh"
      header={
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ButtonGroup
            items={LANGUAGE_OPTIONS}
            selected={language}
            onSelect={setLanguage}
            itemRenderer={(key) => (LANGUAGE_OPTIONS as any)[key].label}
          />
          <View flexDirection="row" alignItems="center">
            {auth?.access_token && (
              <>
                <ButtonMinimal
                  aria-label="execute"
                  size="sm"
                  icon={IconVideoplay}
                  onClick={handleSendRequest}
                />
                <View
                  borderLeft={1}
                  color="soft"
                  paddingLeft={2}
                  marginLeft={2}
                  height={20}
                />
              </>
            )}
            <ButtonMinimal
              aria-label="copy"
              size="sm"
              icon={IconCopy}
              onClick={handleCopyCode}
            />
          </View>
        </View>
      }
    >
      <View
        css={{
          "& > pre": {
            background: "transparent !important",
            fontFamily: "monospace",
            fontSize: "16px",
          },
        }}
      >
        <SyntaxHighlighter language="bash" style={dark} showLineNumbers={true}>
          {content}
        </SyntaxHighlighter>
      </View>
      <textarea
        aria-hidden={true}
        id={`${method}_${path}_code`}
        value={content}
        style={{ zIndex: -1, height: 0 }}
        readOnly={true}
      />
    </BaseCard>
  );
};

export default RequestCard;
