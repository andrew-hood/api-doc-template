import { ButtonMinimal, View } from "@go1d/go1d";
import { FC } from "react";

interface Props {
  items: {};
  selected: string;
  onSelect: (key: string) => void;
  itemRenderer: (key: string) => string;
}

const ButtonGroup: FC<Props> = ({
  items,
  selected,
  onSelect,
  itemRenderer,
}) => {
  return (
    <View flexDirection="row">
      {items &&
        Object.keys(items).map((key: string) => (
          <ButtonMinimal
            key={key}
            size="sm"
            active={selected === key}
            onClick={() => onSelect(key)}
            css={{
              cursor: "pointer",
              height: "32px",
              "& > span": {
                fontSize: "12px",
              },
            }}
          >
            {itemRenderer(key)}
          </ButtonMinimal>
        ))}
    </View>
  );
};

export default ButtonGroup;
