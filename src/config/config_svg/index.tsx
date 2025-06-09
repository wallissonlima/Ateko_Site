import { forwardRef } from "react";
import { ReactSVG } from "react-svg";

const ConfigReactSVG = forwardRef<HTMLDivElement, { src: string }>(
  (props, ref) => (
    <div ref={ref}>
      <ReactSVG {...props} />
    </div>
  )
);

export default ConfigReactSVG;
