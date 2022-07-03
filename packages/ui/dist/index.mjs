// src/partials/Button.tsx
import * as React from "react";
var Button = () => {
  return /* @__PURE__ */ React.createElement("button", null, "Boop");
};

// src/partials/Logo.tsx
import * as React2 from "react";
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

// src/partials/TextBlock.tsx
import * as React3 from "react";
var TextBlock = ({
  children,
  className
}) => {
  return /* @__PURE__ */ React3.createElement("div", {
    className: `t__textarea ${className ? className : ""}`
  }, children);
};

// src/partials/Picture.tsx
import * as React4 from "react";
var Picture = ({ data }) => {
  const getSource = (ext, mime) => {
    const index = data.src.findIndex((x) => x.extension === ext);
    if (index !== -1) {
      return /* @__PURE__ */ React4.createElement("source", {
        key: index,
        srcSet: data.src[index].src,
        type: mime
      });
    } else
      return null;
  };
  return /* @__PURE__ */ React4.createElement("picture", {
    className: "picture"
  }, getSource(".webp", "image/webp"), getSource(".jpeg", "image/jpeg"), getSource(".png", "image/png"), /* @__PURE__ */ React4.createElement("img", {
    src: data.src[0].src,
    alt: data.alt
  }));
};

// src/form/Input.tsx
import * as React5 from "react";
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
  return /* @__PURE__ */ React5.createElement("input", {
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
    autoComplete,
    "aria-errormessage": `${id}_error`,
    "aria-describedby": `i-describe_${id}`
  });
};

// src/form/Textarea.tsx
import * as React6 from "react";
var Textarea = ({
  id,
  name,
  value,
  disabled,
  placeholder,
  minLength,
  maxLength,
  readOnly,
  required,
  updateValue,
  autoComplete
}) => {
  const onChange = (e) => {
    const newValue = e.target.value;
    updateValue(newValue);
  };
  return /* @__PURE__ */ React6.createElement("textarea", {
    className: "input__style input__style--t",
    id,
    name,
    value,
    disabled,
    placeholder,
    required,
    onChange,
    readOnly,
    maxLength,
    minLength,
    autoComplete,
    "aria-errormessage": `${id}_error`,
    "aria-describedby": `i-describe_${id}`
  });
};

// src/form/InputWrapper.tsx
import * as React7 from "react";
var InputWrapper = ({
  id,
  input,
  error,
  label,
  describedBy,
  className
}) => {
  return /* @__PURE__ */ React7.createElement("div", {
    className: `input__wrapper ${className}`,
    id: `i-wrapper_${id}`
  }, label ? /* @__PURE__ */ React7.createElement("label", {
    className: "input__label",
    htmlFor: id
  }, label) : null, input, /* @__PURE__ */ React7.createElement("a", {
    href: `#${id}`,
    id: `${id ? id + "_error" : ""}`,
    className: "input__error"
  }, /* @__PURE__ */ React7.createElement("p", null, error)), describedBy ? /* @__PURE__ */ React7.createElement("p", {
    className: "input__describedby",
    id: `${id ? "i-describe_" + id : ""}`
  }, describedBy) : null);
};

// src/form/FormError.tsx
import React8 from "react";
var FormError = ({ errors }) => {
  if (errors) {
    return /* @__PURE__ */ React8.createElement("div", {
      className: "form__error l--bm-t-l"
    }, /* @__PURE__ */ React8.createElement("p", {
      className: "form__error__title t--text-white"
    }, errors.length > 1 ? "Oops, you have some errors." : `Oops, there's an error.`), /* @__PURE__ */ React8.createElement("ul", {
      className: "form__error__body l--bm-t-s"
    }, errors.map((error, index) => {
      return /* @__PURE__ */ React8.createElement("li", {
        key: index
      }, error.detail);
    })));
  } else
    return null;
};
export {
  Button,
  FormError,
  Input,
  InputWrapper,
  Logo,
  Picture,
  TextBlock,
  Textarea
};
