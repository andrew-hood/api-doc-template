import { get } from "lodash";
import { useEffect, useState } from "react";

const useContentType = (object: any) => {
  const [options, setOptions] = useState<any>([]);
  const [selected, selectOption] = useState(null);

  useEffect(() => {
    if (object) {
      const types: any[] = Object.keys(get(object, `content`, {}))
        .filter(
          (type) =>
            Object.keys(get(object, `content.${type}.schema.properties`, {}))
              .length > 0
        )
        .map((type) => ({
          label: type,
          value: type,
        }));

      setOptions(types);
      types.length > 0 && selectOption(types[0]);
    }
  }, [object]);

  return [selected, options, selectOption];
};

export default useContentType;
