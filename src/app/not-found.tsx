import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#1f1b18] text-white overflow-hidden relative">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter mix-blend-difference text-white leading-none">
          404
        </h1>
        
        <p className="mt-8 text-white/50 text-xl font-light max-w-md">
          El enlace al que intentaste acceder no existe o fue movido.
        </p>

        <Link 
          href="/" 
          className="mt-12 flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
