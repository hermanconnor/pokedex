import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="glass-effect sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
          {/* LOGO */}
          <div className="flex min-w-fit items-center gap-3">
            <div className="size-10">
              <Image
                src="/pokeball.png"
                alt="pokeball"
                width={500}
                height={500}
              />
            </div>

            <div className="hidden sm:block">
              <span className="text-foreground text-xl font-bold">Pokédex</span>
            </div>
          </div>

          {/* DARKMODE TOGGLE */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
