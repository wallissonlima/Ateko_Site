import classNames from "classnames";

import { useEffect } from "react";

import ateko from "../../assets/ateko.png";
import ConfigReactSVG from "../../config/config_svg";
import loading from "../../assets/loadign.svg";
import styles from "./style/loading.module.scss";

function Loading() {
  useEffect(() => {
    try {
      const doc = document.getElementById("nav-container") as HTMLElement;
      if (doc) {
        doc.style.display = "none";
      }

      return () => {
        const doc = document.getElementById("nav-container") as HTMLElement;
        if (doc) {
          doc.style.display = "block";
        }
      };
    } catch (e: any) {
      console.debug(e);
    }
  }, []);

  return (
    <>
      <div id="loading1" className={styles["cst-header"]}>
        <div
          className={classNames(styles["cst-inner-header"], styles["cst-flex"])}
        >
          <></>
        </div>

        <div>
          <>
            <ConfigReactSVG src={loading} />
          </>
        </div>
      </div>
      <div className={classNames(styles["cst-content"], styles["cst-flex"])}>
        <img
          className={styles["visible-img"]}
          src={ateko}
          alt="i9"
          width={100}
          height={100}
        />
      </div>
    </>
  );
}

export default Loading;
