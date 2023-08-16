import { useEffect, useRef } from "react";
import { getCurrentList, useStore } from "./useStore";
import ContentEditable from "react-contenteditable";
import ReactDOMServer from "react-dom/server";

export const EntriesList = () => {
  const { entries } = useStore(getCurrentList);
  const divref = useRef<HTMLDivElement>(null);
  const htmlRef = useRef<string | null>(null);

  const setRef = (jsx: JSX.Element | JSX.Element[] | null) => {
    if (jsx == null) {
      htmlRef.current = null;
    } else {
      htmlRef.current = ReactDOMServer.renderToStaticMarkup(<>{jsx}</>);
    }
  };

  useEffect(() => {
    if (!entries.length) {
      setRef(null);
    } else {
      entries.map((_) => (
        <>
          <p className="inline space-x-5">{_.name}</p>
          <br />
        </>
      ));
    }
  }, [entries]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const ps = document.querySelectorAll(".editable p");
    const rects = [...ps.values()].map((_) => {
      const rect = _.getBoundingClientRect();
      return rect;
    });
    console.log(JSON.stringify(rects[2], null, 1));
    const rec = rects[1];
    // const divrect = divref.current!.getBoundingClientRect();
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
      html={htmlRef.current ?? ""} // innerHTML of the editable div
      onClick={(e) => handleClick(e)}
      onMouseMove={() => {
        //console.log({ clientx: e.clientX, pagex: e.pageX, ox: e.screenX });
      }}
      onChange={(e) => (htmlRef.current = e.target.value)} // handle innerHTML change
    />
  );
};
