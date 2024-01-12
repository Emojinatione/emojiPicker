import React, { useRef, useEffect } from "react";
import { Form } from "react-bootstrap";

// function normalizeHtml(str) {
//   return (
//     str && str.replace(/&nbsp;|\u202F|\u00A0/g, " ").replace(/<br \/>/g, "<br>")
//   );
// }

function replaceCaret(el) {
  const target = document.createTextNode("");
  el.appendChild(target);

  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var sel = window.getSelection();
    if (sel !== null) {
      var range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}

const ContentEditable = ({
  value,
  innerRef,
  onBlur,
  onKeyUp,
  onKeyDown,
  disabled,
  children,
  ...props
}) => {
  const lastHtml = useRef(value);
  const el = useRef(null);

  const getEl = () =>
    typeof innerRef === "function" ? innerRef(el.current) : el.current;

  useEffect(() => {
    const currentEl = getEl();
    if (currentEl) {
      currentEl.innerHTML = value;
      replaceCaret(currentEl);
    }
  }, [value]);

  const emitChange = (originalEvt) => {
    const currentEl = getEl();
    if (!currentEl) return;

    const currentHtml = currentEl.innerHTML;
    if (props.onChange && currentHtml !== lastHtml.current) {
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: currentHtml,
        },
      });
      props.onChange(evt);
    }
    lastHtml.current = currentHtml;
  };

  return (
    <Form.Control
      {...props}
      ref={
        typeof innerRef === "function"
          ? (current) => {
              innerRef(current);
              el.current = current;
            }
          : innerRef || el
      }
      as="div"
      onInput={emitChange}
      onBlur={onBlur || emitChange}
      onKeyUp={onKeyUp || emitChange}
      onKeyDown={onKeyDown || emitChange}
      contentEditable="true"
      dangerouslySetInnerHTML={{ __html: value }}
    >
      {children}
    </Form.Control>
  );
};

export default ContentEditable;
