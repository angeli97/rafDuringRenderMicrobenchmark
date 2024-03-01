import React from "react";
import * as ReactDom from "react-dom";
import { waste } from "./helpers";

export function renderWithRaf(div: HTMLDivElement) {
  ReactDom.render(<Component text="Hello World" />, div);
  
  // requestAnimationFrame(() => waste(1, 'raf execution'));
  setTimeout(() => {
    waste(0, "raf requested");
    requestAnimationFrame(() => waste(0, "raf execution"));
  }, 10);
}

export function renderWithoutRaf(div: HTMLDivElement) {
  ReactDom.render(<Component text="Hello World" />, div);
  waste(0, "no raf requested");
}

function Component(props: { text: string }) {
  return <div>{props.text}</div>;
}
