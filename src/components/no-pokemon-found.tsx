interface Props {
  showFavoritesOnly: boolean;
}

const NoPokemonFound = ({ showFavoritesOnly }: Props) => {
  return (
    <div className="py-12 text-center">
      <div className="text-muted-foreground mb-4">
        <div className="mb-4 text-6xl">{showFavoritesOnly ? "💔" : "🔍"}</div>
        <h3 className="mb-2 text-xl font-semibold">
          {showFavoritesOnly ? "No favorite Pokémon found" : "No Pokémon found"}
        </h3>
        <p>
          {showFavoritesOnly
            ? "Start adding Pokémon to your favorites by clicking the heart icon on any card"
            : "Try adjusting your search or filter criteria"}
        </p>
      </div>
    </div>
  );
};

export default NoPokemonFound;
