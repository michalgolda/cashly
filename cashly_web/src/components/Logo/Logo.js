import * as S from "./Logo.styled";
import LogoSVG from "../../assets/logo.svg";

export default function Logo(props) {
  return <S.Wrapper><img src={LogoSVG} width={190} {...props} /></S.Wrapper>;
}
