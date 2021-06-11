import React, { useEffect, useState } from "react";
import { ImageDecorator } from "./ViewerProps";
import left from "./style/images/left.png";
import right from "./style/images/right.png";

export interface ViewerNavProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  onChangeImg: (index: number) => void;
  navImgs?: number;
}

export default function ViewerNav(props: ViewerNavProps) {
  const [imgs, setImgs] = useState([]);
  const [int, setInt] = useState(0);

  const { activeIndex = 0, images = [], navImgs } = props;

  useEffect(() => {
    if (images.length > navImgs) {
      let num = Math.floor(activeIndex / navImgs);
      setImgs(images.slice(num * navImgs, num * navImgs + navImgs));
      setInt(num);
    } else {
      setImgs(images);
    }
  }, [activeIndex]);

  function handleChangeImg(newIndex) {
    if (activeIndex === newIndex) {
      return;
    }
    props.onChangeImg(newIndex);
  }

  function handleLeft() {
    props.onChangeImg(activeIndex - navImgs);
  }
  function handleRight() {
    props.onChangeImg(activeIndex + navImgs);
  }

  // console.log(activeIndex, imgs, int);

  return (
    <div className={`${props.prefixCls}-navbar`}>
      <ul
        className={`${props.prefixCls}-list ${props.prefixCls}-list-transition`}
        style={{
          textAlign: "center",
        }}
      >
        {int > 0 && (
          <img onClick={handleLeft} src={left} style={{ marginRight: 36 }} />
        )}
        {imgs.map((item, index) => (
          <li
            key={index}
            className={index + int * navImgs === activeIndex ? "active" : ""}
            onClick={() => {
              handleChangeImg(index + int * navImgs);
            }}
          >
            <img src={item.src} alt={item.alt} />
          </li>
        ))}
        {int < Math.floor(images.length / navImgs) && (
          <img onClick={handleRight} src={right} />
        )}
      </ul>
    </div>
  );
}
