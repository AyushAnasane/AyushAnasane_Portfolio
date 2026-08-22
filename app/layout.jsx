import "./globals.css";

export const metadata = {
  title: "AyushAnasane",
  description: "Ayush Anasane portfolio"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
