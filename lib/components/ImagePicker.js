import {
  Button,
  IconButton,
  Surface,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { Image, View } from "react-native";
import Template from "./Template";
import AppStyles, { PRIMARY_DARK } from "./AppStyles";
import range from "../utils/range";
import mutex, { useMutex } from "../utils/mutex";

export function useImagePicker(images, setImage, max = 1) {
  if (!Array.isArray(images)) images = [].concat(images);
  const pickImage = useMutex(async (i = 0) => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (max === 1) setImage(result.assets[0].uri);
      else {
        images = images ?? range(max).map(() => null);
        for (let { uri } of result.assets) {
          images[i] = uri;
          if (++i > max) break;
        }
        setImage(images);
      }
    }
  });
  const removeImage = (_i) => {
    setImage(loaded.filter((_, i) => i !== _i));
  };
  const loaded = images.filter(Boolean);
  return [loaded, pickImage, removeImage];
}

export default function ImagePicker({ image, max = 2, setImage, ...props }) {
  const [loaded, pickImage, removeImage] = useImagePicker(image, setImage, max);
  return (
    <Template
      as={Surface}
      props={props}
      style={{
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 30,
        display: "flex",
        borderRadius: 20,
        height: 220,
      }}
    >
      <Text
        variant="titleMedium"
        style={[
          AppStyles.primaryText,
          { textAlign: "center", marginBottom: 20 },
        ]}
      >
        Select item image from device
      </Text>
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          borderColor: PRIMARY_DARK,
          borderStyle: "dashed",
          borderRadius: 20,
          borderWidth: image ? 0 : 1,
          display: "flex",
          flexDirection: "row",
          flex: 1,
        }}
      >
        {loaded.map((e, i) => (
          <TouchableRipple
            onPress={() => removeImage(i)}
            key={i}
            style={{
              width: 0,
              flex: 1,
              marginLeft: i > 0 ? 7.5 : 0,
              marginRight: i < loaded.length - 1 ? 7.5 : 0,
            }}
          >
            <Image
              source={{ uri: e }}
              style={{ width: "100%", height: "100%", borderRadius: 15 }}
            ></Image>
          </TouchableRipple>
        ))}
        {loaded.length < max ? (
          <TouchableRipple
            onPress={() => pickImage(loaded.length)}
            style={[
              AppStyles.primaryVariant,
              {
                width: 0,
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                marginLeft: 10,
                marginRight: loaded.length ? 0 : 10,
              },
            ]}
          >
            <View style={{ padding: 20 }}>
              <IconButton
                icon="image-outline"
                size={36}
                iconColor={PRIMARY_DARK}
              />
              {loaded.length ? null : (
                <Text style={AppStyles.primaryText}>Add Image</Text>
              )}
            </View>
          </TouchableRipple>
        ) : null}
      </View>
    </Template>
  );
}
