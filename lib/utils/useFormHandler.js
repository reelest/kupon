import { useMemo, useState } from "react";

export default function useFormHandler(defaults = {}, cb) {
  const [data, setData] = useState(defaults);
  return useMemo(() => new FormHandler(data, setData, cb), [data, cb]);
}

class FormHandler {
  constructor(data, setData, cb) {
    this.data = data;
    this.setData = setData;
    this.cb = cb;
  }
  _update(data = {}) {
    this.data = { ...this.data, ...data };
    this.setData(this.data);
  }
  textInput(id, type) {
    return {
      id,
      name: id,
      type,
      onChangeText: (e) => {
        this.data[id] = e;
        this._update();
      },
      value: this.data[id] || "",
    };
  }
  // radio(id) {
  //   return this.textInput(...args, "radio");
  // }
  // checkbox(id) {
  //   return {
  //     id,
  //     name: id,
  //     type: "checkbox",
  //     onChange: (e) => {
  //       this.data[id] = e.target.checked;
  //       this._update();
  //     },
  //     value: this.data[id] || false,
  //   };
  // }
  submit(id) {
    return {
      id,
      name: id,
      type: "submit",
      onPress: async (e) => {
        try {
          this.data[id] = true;
          this._update();
          await this.cb(this.data);
        } catch (e) {
          console.error(e);
        }
      },
    };
  }
}
