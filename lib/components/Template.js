import { Empty, None } from "../utils/none";
import { createElement } from "react";
import { View } from "react-native";
import mergeProps from "../utils/mergeProps";

export default function Template({
  as = View,
  children,
  style = None,
  props: { style: styles2 = None, children: children2, as: as2, ...props2 },
  mergeableEvents = Empty,
  ...props
}) {
  return createElement(
    as2 || as,
    {
      style: [].concat(style).concat(styles2),
      ...mergeProps(props, props2, mergeableEvents),
    },
    children && children2
      ? [].concat(children).concat(children2)
      : children || children2
  );
}
