import { View } from "react-native";
import { useState, useMemo, useRef } from "react";
import range from "../../utils/range";
import { debounce } from "lodash";
import { ActivityIndicator } from "react-native-paper";

export default function MasonryLayout({ products, renderItem }) {
  /**@type {[Array<number>, React.SetStateAction]} */
  const numProducts = products?.length | 0;
  const heights = useRef([]).current;
  const [updated, triggerUpdate] = useState();
  const scheduleUpdate = useMemo(() =>
    debounce(triggerUpdate, 2000, {
      maxWait: 3000,
      leading: true,
      trailing: true,
    })
  ).bind(null, {});
  const numColumns = 2;
  const computeColumns = () => {
    const columns = range(numColumns).map(() => []);
    const totalHeight = range(numColumns).map(() => 0);
    let stop = true;
    for (let i = 0; i < numProducts; i++) {
      let min, minV;
      stop = stop || heights[i] === undefined;
      if (stop) {
        //Stop computing columns that might still change
        min = i % numColumns;
        minV = totalHeight[min];
      } else {
        min = 0;
        minV = totalHeight[0];
        for (let j = 1; j < numColumns; j++) {
          if (totalHeight[j] < minV) {
            // TODO align bottoms of images
            min = j;
            minV = totalHeight[j];
          }
        }
      }
      totalHeight[min] = minV + (stop ? 100 : heights[i]);
      columns[min].push(i);
    }
    heights.length = numProducts;
    return columns;
  };
  const columns = useMemo(computeColumns, [numProducts, updated, numColumns]);
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          paddingVertical: 10,
          justifyContent: "center",
        },
      ]}
    >
      {!products ? (
        <View style={{ height: "100%", alignItems: "center" }}>
          <ActivityIndicator size={36} />
        </View>
      ) : (
        range(numColumns).map((num) => {
          return (
            <View
              key={`masonry-column-${num}`}
              style={{
                flex: 1 / numColumns,
                flexDirection: "column",
              }}
            >
              {columns[num].map((i) => {
                return (
                  <View
                    onLayout={(ev) => {
                      heights[i] = ev.nativeEvent.layout.height;
                      scheduleUpdate();
                    }}
                    key={`masonry-row-${num}-${i}`}
                  >
                    {renderItem({ item: products[i], i })}
                  </View>
                );
              })}
            </View>
          );
        })
      )}
    </View>
  );
}
