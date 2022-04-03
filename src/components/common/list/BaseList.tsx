import { Heading, Select, Text, View, ViewProps } from "@go1d/go1d";
import { FC, ReactElement } from "react";

interface Props {
  title?: string;
  items: any[];
  itemRenderer: (item: any, index: number) => ReactElement;
  options?: any[];
  selected?: any;
  onChange?: (val: any) => void;
}

const BaseList: FC<Props & ViewProps> = ({
  title = null,
  items,
  itemRenderer,
  options,
  selected,
  onChange,
  ...props
}) => {
  return (
    <View marginY={title ? 5 : 1} {...props}>
      {title && (
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderColor="delicate"
          borderBottom={1}
          marginBottom={4}
        >
          <Heading
            semanticElement="h4"
            visualHeadingLevel="Heading 4"
            marginBottom={3}
          >
            {title}
          </Heading>
          {options && (
            <View alignItems="flex-end">
              {options.length > 1 ? (
                <Select
                  value={selected.label}
                  onChange={(e) => onChange && onChange(e.target)}
                  border={0}
                  options={options}
                  size="sm"
                />
              ) : (
                <Text fontSize={1} color="subtle">
                  {options[0]?.label}
                </Text>
              )}
            </View>
          )}
        </View>
      )}
      <View>{items.map(itemRenderer)}</View>
    </View>
  );
};

export default BaseList;
