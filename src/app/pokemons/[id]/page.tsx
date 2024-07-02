import PokemonDetail from "@/app/components/PokemonDetail";

type PokemonDetailPageProps = {
  params: {
    id: string;
  };
};

const PokemonDetailPage = ({ params }: PokemonDetailPageProps) => {
  return (
    <div>
      <PokemonDetail id={params.id} />
    </div>
  );
};

export default PokemonDetailPage;
