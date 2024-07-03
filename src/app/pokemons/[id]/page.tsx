import PokemonDetail from "@/app/(pokemon)/_components/PokemonDetail";

const PokemonDetailPage = ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  return (
    <div>
      <PokemonDetail id={id} />
    </div>
  );
};

export default PokemonDetailPage;
