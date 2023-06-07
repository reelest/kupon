import { useMemo, useState } from "react";

export default function useFormHandler(defaults = {}, cb) {
  const [data, setData] = useState(defaults);
  const [error, setError] = useState(null);
  return useMemo(
    () => new FormHandler(data, setData, cb, error, setError),
    [data, cb, error]
  );
}

class FormHandler {
  constructor(data, setData, cb, error, setError) {
    this.data = data;
    this.setData = setData;
    this.error = error;
    this.setError = setError;
    this.cb = cb;
  }
  _update(data = {}) {
    this.data = { ...this.data, ...data };
    this.setData(this.data);
  }
  set(key, value) {
    this.data[key] = value;
    this._update();
  }
  textInput(id, type) {
    return {
      id,
      name: id,
      type,
      onChangeText: (e) => {
        this.set(id, e);
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
      onPress: async () => {
        try {
          id ?? this.set(id, true);
          await this.cb(this.data);
        } catch (e) {
          console.warn("Form error: ", e);
          this.setError(e);
        }
      },
    };
  }
}
