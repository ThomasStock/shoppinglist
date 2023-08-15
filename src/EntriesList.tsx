import { useEffect, useRef, useState } from "react";
import { getCurrentList, useStore } from "./useStore";
import ContentEditable from "react-contenteditable";

export const EntriesList = () => {
  const { entries } = useStore(getCurrentList);
  const [text, setText] = useState("");
  const divref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!entries.length) {
      setText("");
      return;
    }
    setText(entries.map((_) => `<p style="display: inline">${_.name}</p>`).join("</br>"));
  }, [entries]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const ps = document.querySelectorAll(".editable p");
    const rects = [...ps.values()].map((_) => {
      const rect = _.getBoundingClientRect();
      return rect;
    });
    console.log(JSON.stringify(rects[2], null, 1));
    const rec = rects[1];
    const divrect = divref.current!.getBoundingClientRect();
    const mousex = e.nativeEvent.pageX;
    const mousey = e.nativeEvent.pageY;
    console.log(mousex - rec.right, mousey >= rec.top && mousey <= rec.bottom);
    console.log({ mousex, mousey, r: rec.right, l: rec.y });
  };

  return (
    <ContentEditable
      innerRef={divref}
      className="editable"
      tagName="pre"
      html={text} // innerHTML of the editable div
      onClick={(e) => handleClick(e)}
      onMouseMove={(e) => {
        //console.log({ clientx: e.clientX, pagex: e.pageX, ox: e.screenX });
      }}
      onChange={(e) => setText(e.target.value)} // handle innerHTML change
    />
  );
};
