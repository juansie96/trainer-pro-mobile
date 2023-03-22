import { createElement } from "react";

export default function DateTimePicker({ value, onChange }: any) {
  return createElement("input", {
    type: "date",
    value: value,
    onInput: onChange,
    style: {
      height: 35,
    },
  });
}
