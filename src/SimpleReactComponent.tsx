import React from "react";
import * as ReactDom from "react-dom";
import { waste } from "./helpers";

export function renderWithRaf(div: HTMLDivElement) {
  ReactDom.render(<Component text="Hello World" />, div);
  waste(1, 'raf requested');
  requestAnimationFrame(() => requestAnimationFrame(() => waste(1, 'raf execution')));
}

export function renderWithoutRaf(div: HTMLDivElement) {
  ReactDom.render(<Component text="Hello World" />, div);
  waste(1, 'no raf requested');
}

function Component(props: { text: string }) {
  return <div>{props.text}</div>;
}

