function makeDraggable(targetElement: HTMLDivElement): void {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const windowFrame = targetElement.querySelector(
    ".gm-frame"
  ) as HTMLDivElement;
  if (windowFrame) {
    windowFrame.onmousedown = dragMouseDown;
  } else {
    targetElement.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: MouseEvent): void {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent): void {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    targetElement.style.top = targetElement.offsetTop - pos2 + "px";
    targetElement.style.left = targetElement.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
export default makeDraggable;
