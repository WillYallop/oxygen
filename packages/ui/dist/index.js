var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  Input: () => Input,
  InputWrapper: () => InputWrapper,
  Logo: () => Logo
});
module.exports = __toCommonJS(src_exports);

// src/shared/Button.tsx
var React = __toESM(require("react"));
var Button = () => {
  return /* @__PURE__ */ React.createElement("button", null, "Boop");
};

// src/shared/Logo.tsx
var React2 = __toESM(require("react"));
var Logo = ({ size }) => {
  return /* @__PURE__ */ React2.createElement("span", {
    className: `logo-root logo-root--${size} l--f l--f-a-c`
  }, /* @__PURE__ */ React2.createElement("svg", {
    width: "30",
    height: "30",
    viewBox: "0 0 30 30",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React2.createElement("path", {
    d: "M15 30a15 15 0 1 0 0-30 15 15 0 0 0 0 30Z",
    fill: "#484848"
  }), /* @__PURE__ */ React2.createElement("path", {
    d: "M15 29a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z",
    fill: "#141414"
  }), /* @__PURE__ */ React2.createElement("path", {
    d: "M.96 14.56a39.92 39.92 0 0 1 5.83-2.67c2.55-.8 5.29-.73 7.8.19 2.6.94 5.18 2.87 7.78 4 1.97.83 4.04 1.38 6.16 1.66a13.45 13.45 0 0 1-1.31 3.67H2.55c-.56-1-.99-2.07-1.27-3.2a16.2 16.2 0 0 1-.33-3.65Z",
    fill: "#05F"
  }), /* @__PURE__ */ React2.createElement("path", {
    opacity: ".66",
    d: "M28.89 13.46s-.3-.14-.4-.16a14.1 14.1 0 0 0-7.79.16c-2.6.8-5.19 2.45-7.79 3.41-2.1.74-4.27 1.23-6.49 1.47l-1.3.16v2.92h22.1a16 16 0 0 0 1.58-4.1c.22-1.27.25-2.57.09-3.86Z",
    fill: "#05F"
  }), /* @__PURE__ */ React2.createElement("path", {
    d: "M28.7 17.75s-.07 2.8-3.3 6.6a13.99 13.99 0 0 1-15.94 3.5 14.27 14.27 0 0 1-4.7-3.24 15.14 15.14 0 0 1-3.57-6.86H28.7Z",
    fill: "#05F"
  })), "Oxygen");
};

// src/form/Input.tsx
var React3 = __toESM(require("react"));
var Input = ({
  id,
  name,
  type,
  value,
  disabled,
  placeholder,
  minLength,
  maxLength,
  pattern,
  readOnly,
  required,
  updateValue,
  autoComplete
}) => {
  const onChange = (e) => {
    const newValue = e.target.value;
    updateValue(newValue);
  };
  return /* @__PURE__ */ React3.createElement("input", {
    className: "input__style input__style--i",
    id,
    name,
    type,
    value,
    disabled,
    placeholder,
    required,
    onChange,
    readOnly,
    maxLength,
    minLength,
    pattern,
    autoComplete
  });
};

// src/form/InputWrapper.tsx
var React4 = __toESM(require("react"));
var InputWrapper = ({
  id,
  input,
  error,
  label
}) => {
  return /* @__PURE__ */ React4.createElement("div", {
    className: "input__wrapper",
    id: `i-wrapper_${id}`
  }, label ? /* @__PURE__ */ React4.createElement("label", {
    className: "input__label",
    htmlFor: id
  }, label) : null, input, /* @__PURE__ */ React4.createElement("div", {
    className: "input__error"
  }, /* @__PURE__ */ React4.createElement("p", null, error)));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Input,
  InputWrapper,
  Logo
});
