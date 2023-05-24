import { View } from "react-native";
import { useState, useMemo, useRef } from "react";
import range from "../../utils/range";
import { debounce } from "lodash";

export default function MasonryLayout({ products, renderItem, spacing = 20 }) {
  /**@type {[Array<number>, React.SetStateAction]} */
  const numProducts = products?.length | 0;
  const heights = useRef([]).current;
  const [updater, setUpdater] = useState();
  const update = useMemo(() =>
    debounce(setUpdater, 1000, { maxWait: 3000, leading: true, trailing: true })
  );
  const numColumns = 2;
  const computeColumns = () => {
    const columns = range(numColumns).map((e) => []);
    const totalHeight = range(numColumns).map((e) => 0);
    let stop = false;
    for (let i = 0; i < numProducts; i++) {
      stop = stop || heights[i] === undefined;
      let min = 0;
      let minV = totalHeight[0];
      for (let j = 1; j < numColumns; j++) {
        if (totalHeight[j] < minV) {
          // TODO align bottoms of images
          min = j;
          minV = totalHeight[j];
        }
      }
      totalHeight[min] = minV + (stop ? 100 : heights[i]);
      columns[min].push(i);
    }
    heights.length = numProducts;
    return columns;
  };
  const columns = useMemo(computeColumns, [numProducts, updater, numColumns]);
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          paddingVertical: 10,
        },
      ]}
    >
      {range(numColumns).map((num) => {
        return (
          <View
            key={`masonry-column-${num}`}
            style={{
              flex: 1 / numColumns,
              flexDirection: "column",
            }}
          >
            {products &&
              columns[num].map((i) => {
                return (
                  <View
                    onLayout={(ev) => {
                      heights[i] = ev.nativeEvent.layout.height;
                      console.log("got " + i);
                      update({});
                    }}
                    key={`masonry-row-${num}-${i}`}
                  >
                    {renderItem({ item: products[i], i })}
                  </View>
                );
              })}
          </View>
        );
      })}
    </View>
  );
}