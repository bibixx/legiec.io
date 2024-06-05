"use server";

import { LinkService } from "@/services/LinkService";
import { LinksTable } from "./LinksTable";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const linkService = new LinkService();
  const links = await linkService.getAllLinks();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b dark:bg-background/75 bg-background/65 backdrop-blur-lg">
        <div className="container flex h-14 items-center font-bold w-full justify-between">
          <div className="sm:hidden block" />
          <h1 className="select-none hidden sm:block font-display text-2xl ml-2">
            Link Shortener Admin
          </h1>

          <Button asChild variant="outline">
            <a href="/api/auth/logout" className="mr-2">
              Logout
            </a>
          </Button>
        </div>
      </header>
      <main className="container w-full mx-auto my-8">
        <LinksTable links={links} />
      </main>
    </>
  );
}
