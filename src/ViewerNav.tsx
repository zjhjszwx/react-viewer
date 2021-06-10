import * as React from "react";
import { ImageDecorator } from "./ViewerProps";

export interface ViewerNavProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  onChangeImg: (index: number) => void;
}

export default function ViewerNav(props: ViewerNavProps) {
  const { activeIndex = 0, images } = props;

  function handleChangeImg(newIndex) {
    if (activeIndex === newIndex) {
      return;
    }
    props.onChangeImg(newIndex);
  }

  console.log(images)
  return (
    <div className={`${props.prefixCls}-navbar`}>
      <ul
        className={`${props.prefixCls}-list ${props.prefixCls}-list-transition`}
        style={{
          textAlign: "center",
        }}
      >
        {images.map((item, index) => (
          <li
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => {
              handleChangeImg(index);
            }}
          >
            <img src={item.src} alt={item.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
}
