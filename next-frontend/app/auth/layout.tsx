export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}

      <div className="fixed bottom-0 h-14 -z-[1] bg-gray-100 w-full flex justify-center items-center text-sm">
        Work With Love
      </div>
    </>
  );
}
