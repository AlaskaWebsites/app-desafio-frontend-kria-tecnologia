import { ModalProvider } from "@/src/app/context/ModalContext";
import Header from "@/src/components/template/LayoutDefault/Partials/Header";
import Footer from "@/src/components/template/LayoutDefault/Partials/Footer";
import ModalComponent from "@/src/components/template/LayoutDefault/Partials/Modal";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Desafio Frontend Kria Tecnologia",
  description: "Desafio Frontend Kria Tecnologia",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body className="antialiased">
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ModalComponent />
        </ModalProvider>
      </body>
    </html>
  );
};

export default RootLayout;
