"use server";

import { LinkService } from "@/services/LinkService";
import { LinksTable } from "./LinksTable";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const linkService = new LinkService();
  const links = await linkService.getAllLinks();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center font-bold w-full justify-between">
          <div className="sm:hidden block" />
          <h1 className="select-none hidden sm:block">Link Shortener Admin</h1>

          <Button asChild variant="outline">
            <a href="/api/auth/logout">Logout</a>
          </Button>
        </div>
      </header>
      <main className="container w-full mx-auto my-8">
        <LinksTable links={links} />
      </main>
    </>
  );
}
