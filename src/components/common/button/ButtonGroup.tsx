import { ButtonMinimal, View } from "@go1d/go1d";
import { FC } from "react";

interface Props {
  items: Record<string, any>;
  selected?: string;
  onClick: (key: string) => void;
  itemRenderer: (key: string, item?: any) => string;
}

const ButtonGroup: FC<Props> = ({ items, selected, onClick, itemRenderer }) => {
  return (
    <View flexDirection="row" alignItems="center">
      {items &&
        Object.keys(items).map((key: string) => (
          <ButtonMinimal
            key={key}
            size="sm"
            active={selected === key}
            onClick={() => onClick(key)}
            marginX={1}
            css={{
              cursor: "pointer",
              height: "34px",
              "& > span": {
                fontSize: "12px",
              },
            }}
          >
            {itemRenderer(key, items[key])}
          </ButtonMinimal>
        ))}
    </View>
  );
};

export default ButtonGroup;
