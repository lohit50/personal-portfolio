import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CustomScrollbar from "@/components/CustomScrollbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col"> 
      <Header />
      <About />
      <Footer />
      <div className="box1"></div>
      <div className="box1"></div>
      <div className="box1"></div>
      <div className="box1"></div>
    </main>
  );
}
