import { Context } from "./styles";

export const PageHeader = (props: any) => {
  const { headertext, icon } = props;
  return (
    <Context>
      <h2>{headertext}</h2>
      <span>{icon}</span>
    </Context>
  );
};
