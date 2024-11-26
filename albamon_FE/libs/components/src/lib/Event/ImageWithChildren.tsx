export const ImageWithChildren = ({
  backgroundColor,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  children,
}) => {
  return (
    <div
      style={{
        backgroundColor,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
      }}
    >
      {/*<button*/}
      {/*  onClick={() =>*/}
      {/*    children?.find((child) => child.type === 'BUTTON')?.onClick?.()*/}
      {/*  }*/}
      {/*></button>*/}
      <div>{children}</div>
    </div>
  );
};
