import { Header } from "../../../components/Header";
import { PageHeader } from "../../../components/pageHeader";
import { CardProdutos } from "./card";
import { Context, NewButton } from "./styles";

export const Produtos = () => {
  return (
    <>
      <Header />
      <Context>
        <NewButton>Novo Produto</NewButton>
        <PageHeader />
        <CardProdutos />
      </Context>
    </>
  );
};
