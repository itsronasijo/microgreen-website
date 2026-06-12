import "./globals.css";
import TopBar from "./components/TopBar";
import Header from "./components/Header";


export const metadata = {
  title: "MicroGreen",
  description: "Fresh Organic Microgreens",
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
         <TopBar />
        <Header />
         <main className="pt-32">
        {children}
         </main>
      </body>
    </html>
  );
}
