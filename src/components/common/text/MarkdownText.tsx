import { Text, TextProps } from "@go1d/go1d";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./MarkdownText.module.css";

interface Props {
  text: string;
  props?: any;
}

const MarkdownText: FC<Props & TextProps> = ({ text, ...props }) => {
  return (
    <Text {...props}>
      <ReactMarkdown className={styles["markdown-body"]}>{text}</ReactMarkdown>
    </Text>
  );
};

export default MarkdownText;
