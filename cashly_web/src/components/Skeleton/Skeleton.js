import PropTypes from "prop-types";
import * as S from "./Skeleton.styled";

const SKELETON_TYPES = {
  circle: S.CircleSkeleton,
  rectangle: S.RectangleSkeleton,
};

function Skeleton({ type, width, height, ...props }) {
  const ChoosedSkeletonType = SKELETON_TYPES[type];

  return <ChoosedSkeletonType {...props} width={width} height={height} />;
}

Skeleton.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.oneOf(["rectangle", "circle"]),
};

Skeleton.defaultProps = { type: "rectangle" };

export default Skeleton;
