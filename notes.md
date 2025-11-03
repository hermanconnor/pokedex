That’s a great full-stack Next.js question — you’re describing a **hybrid server/client architecture** that fetches data from the **PokéAPI** on the **server** (for SEO, speed, and reduced API exposure), then **passes it to a client component** where users can interact (search, sort, filter, paginate, etc.).

Below is a step-by-step guide and example code structure for **Next.js 16 (App Router)**.

---

## 🧩 1. Project Setup

Make sure you’re using the **App Router** and **React Server Components** (default since Next.js 13).

```bash
npx create-next-app@latest poke-browser
cd poke-browser
npm install
```

---

## 🗂️ 2. Folder Structure

```
app/
  page.tsx              // Server component (fetches data)
  components/
    PokemonList.tsx     // Client component
    Pagination.tsx      // Client subcomponent
    Filters.tsx         // Client subcomponent
```

---

## ⚙️ 3. Server Component – `app/page.tsx`

This component will:

- Fetch Pokémon from PokéAPI on the server.
- Handle pagination (via URL params).
- Pass the data down to a **client component** for interactivity.

```tsx
// app/page.tsx
import PokemonList from "./components/PokemonList";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemon(page: number, limit: number) {
  const offset = (page - 1) * limit;
  const res = await fetch(`${POKEAPI_URL}?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 60 }, // cache for 1 minute
  });
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; limit?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;

  const data = await getPokemon(page, limit);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Pokémon Browser</h1>
      <PokemonList
        pokemon={data.results}
        total={data.count}
        page={page}
        limit={limit}
      />
    </main>
  );
}
```

---

## 💡 4. Client Component – `app/components/PokemonList.tsx`

This component:

- Allows searching, sorting, and filtering in the browser.
- Handles pagination locally by updating the URL query parameters (which triggers a server reload).

```tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";
import Filters from "./Filters";

interface Pokemon {
  name: string;
  url: string;
}

interface Props {
  pokemon: Pokemon[];
  total: number;
  page: number;
  limit: number;
}

export default function PokemonList({ pokemon, total, page, limit }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState(""); // could be type-based filter later

  // Derived data
  const filtered = useMemo(() => {
    let filtered = pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
    if (sort === "desc") filtered = [...filtered].reverse();
    return filtered;
  }, [pokemon, search, sort]);

  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}&limit=${limit}`);
  };

  const handleLimitChange = (newLimit: number) => {
    router.push(`/?page=1&limit=${newLimit}`);
  };

  return (
    <div>
      <Filters
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        limit={limit}
        onLimitChange={handleLimitChange}
      />

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {filtered.map((p) => (
          <li
            key={p.name}
            className="rounded bg-slate-100 p-4 transition hover:bg-slate-200"
          >
            <p className="font-semibold capitalize">{p.name}</p>
          </li>
        ))}
      </ul>

      <Pagination
        total={total}
        page={page}
        limit={limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

---

## 🔍 5. Filters Component – `app/components/Filters.tsx`

```tsx
"use client";

interface Props {
  search: string;
  setSearch: (s: string) => void;
  sort: string;
  setSort: (s: string) => void;
  limit: number;
  onLimitChange: (n: number) => void;
}

export default function Filters({
  search,
  setSearch,
  sort,
  setSort,
  limit,
  onLimitChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded border px-2 py-1"
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded border px-2 py-1"
      >
        <option value="asc">A–Z</option>
        <option value="desc">Z–A</option>
      </select>

      <select
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="rounded border px-2 py-1"
      >
        {[10, 20, 50, 100].map((num) => (
          <option key={num} value={num}>
            {num} per page
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

## ⏭️ 6. Pagination Component – `app/components/Pagination.tsx`

```tsx
"use client";

interface Props {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  total,
  page,
  limit,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
```

---

## 🧠 How It Works

- **Server side (page.tsx)**: Fetches a slice of Pokémon using PokéAPI’s `?limit` and `offset` params.
- **Client side**:
  - `PokemonList` provides search, sort, and limit change (local interactions).
  - Pagination triggers navigation to new server pages (`/?page=2&limit=20`), which causes the **server component** to fetch a new set of Pokémon.

- This combines **server-driven pagination** with **client-driven UI interactivity**.

---

## 🚀 Optional Enhancements

- Add type filters (you can fetch `/pokemon/{name}` to get detailed type info).
- Prefetch next page data using Next.js `Link` or `router.prefetch()`.
- Use React Query or SWR for smoother client-side caching.
- Add image display via each Pokémon’s detail endpoint.

---

Would you like me to show how to **display Pokémon images and types** (which requires fetching individual Pokémon details efficiently)?
