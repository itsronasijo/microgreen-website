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
         <div className="sticky top-0 z-50">
         <TopBar />
        <Header />
            </div>
         <main>
        {children}
         </main>
      </body>
    </html>
  );
}
