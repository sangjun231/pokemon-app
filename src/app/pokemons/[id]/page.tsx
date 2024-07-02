import PokemonDetail from "@/app/components/PokemonDetail";

type PokemonDetailPageProps = {
  params: {
    id: string;
  };
};

const PokemonDetailPage = ({ params }: PokemonDetailPageProps) => {
  return <PokemonDetail id={params.id} />;
};

export default PokemonDetailPage;
