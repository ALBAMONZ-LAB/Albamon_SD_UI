export const Image = ({
  imageUrl,
  backgroundColor,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  width,
  height,
  onClick,
}) => (
  <div
    style={{
      backgroundColor,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      width,
      height,
    }}
  >
    <img src={imageUrl} alt="example" style={{ width }} />
  </div>
);
