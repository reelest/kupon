import { Dialog } from "react-native-paper";
import { useState, useRef } from "react";
import useToggler from "./useToggler";

export default function useModal(initial) {
  const [visible, show, hide] = useToggler(initial);
  const render = useRef();
  console.log("rendering modal " + visible);
  render.current = (props) => (
    <Dialog
      visible={visible}
      onDismiss={hide}
      {...props}
      style={{ elevation: 30, ...props.style }}
    />
  );
  const Modal = useRef(function Modal(props) {
    return render.current(props);
  }).current;

  return {
    Modal: Modal,
    show,
    hide,
    shown: visible,
  };
}
