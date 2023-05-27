import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error Server Component
    // eslint-disable-next-line react/jsx-no-undef
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
