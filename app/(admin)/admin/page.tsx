"use server";

import { LinkService } from "@/services/LinkService";
import { ResetButton } from "./ResetButton";
import { LinksTable } from "./LinksTable";

export default async function AdminPage() {
  const linkService = new LinkService();
  const links = await linkService.getAllLinks();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center font-bold w-full justify-between">
          <h1 className="select-none">Link Shortener Admin</h1>
          <ResetButton />
        </div>
      </header>
      <main className="container w-full mx-auto my-8">
        <LinksTable links={links} />
      </main>
    </>
  );
}
