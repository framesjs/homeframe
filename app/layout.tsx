export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Your Title Here</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
