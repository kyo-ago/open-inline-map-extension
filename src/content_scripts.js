(() => {
  const getPosition = (size, container, target) => {
    return {
      width: size.width,
      height: size.height,
      top: window.scrollY + target.bottom,
      left: window.scrollX + target.left + target.width / 2,
    };
  };

  const removeClickListener = ({ target }) => {
    while (target.parentNode) {
      if (target.parentNode.getAttribute("data-extension-id") === "container") {
        target.parentNode.parentNode.removeChild(target.parentNode);
        return;
      }
      target = target.parentNode;
    }
  };

  const selection = window.getSelection();
  if (!selection) {
    return;
  }
  const rect = selection.getRangeAt(0).getBoundingClientRect();
  const position = getPosition(
    {
      width: 500,
      height: 400,
    },
    {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    },
    rect
  );
  const container = document.createElement("div");
  container.setAttribute("data-extension-id", "container");
  container.setAttribute(
    "style",
    `
  position: absolute;
  width: ${position.width}px;
  height: ${position.height}px;
  top: ${position.top}px;
  left: ${position.left}px;
`
  );
  container.innerHTML = `
<div
  style="
    text-align: right;
  "
>
<svg
  style="
    cursor: pointer;
  "
  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
</div>
<iframe
  src=""
  width="100%"
  height="auto"
  frameborder="0"
  style="
    border:0;
    position: relative;
    width: 100%;
    height: 100%;
  "></iframe>
`;
  container
    .querySelector("iframe")
    .setAttribute(
      "src",
      `https://maps.google.co.jp/maps?output=embed&q=${selection.toString()}&t=m&z=18`
    );
  container.querySelector("svg").addEventListener("click", removeClickListener);
  document.body.appendChild(container);
})();
