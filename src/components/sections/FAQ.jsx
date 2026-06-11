"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export default function FAQ({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  // Filtramos solo los que están activos y validamos que sea un array
  const faqs = Array.isArray(data) ? data.filter(item => item.ON_OFF === 'ON') : [];

  if (faqs.length === 0) return null;

  return (
    <section className="py-12 px-6 bg-transparent transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          // MAPEO DIRECTO: Valor es la pregunta, Texto es la respuesta.
          const pregunta = item.Valor; 
          const respuesta = item.Texto;

          return (
            <div 
              key={index}
              className={`border rounded-[2.5rem] overflow-hidden transition-all duration-500 bg-white dark:bg-slate-900/50 shadow-sm ${
                isOpen ? 'border-primary dark:border-accent shadow-xl' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* BOTÓN DE LA PREGUNTA */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex flex-col items-center justify-center p-10 md:p-14 text-center group outline-none"
              >

                <span className={`text-2xl md:text-3xl font-black italic uppercase tracking-tighter transition-colors duration-300 max-w-2xl leading-tight ${
                  isOpen ? 'text-primary dark:text-accent' : 'text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-accent'
                }`}>
                  {pregunta}
                </span>

                <div className={`mt-6 transition-all duration-500 ${
                  isOpen ? 'rotate-180 text-primary dark:text-accent scale-125' : 'rotate-0 text-slate-300'
                }`}>
                  <ChevronDown size={32} strokeWidth={3} />
                </div>
              </button>

              {/* CONTENIDO DE LA RESPUESTA */}
              <div 
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-8 md:p-16 pt-0 border-t border-slate-100 dark:border-slate-800/50 text-center">
                  <div className="text-slate-700 dark:text-slate-200 prose prose-slate dark:prose-invert max-w-none leading-relaxed text-xl font-medium italic whitespace-pre-wrap">
                    <ReactMarkdown 
                      remarkPlugins={[remarkBreaks]}
                      components={{
                        // Forzamos que las negritas (**) sean realmente negras y resalten
                        strong: ({children}) => (
                          <strong className="font-black text-slate-900 dark:text-white not-italic underline decoration-primary/30 dark:decoration-accent/30 decoration-4">
                            {children}
                          </strong>
                        )
                      }}
                    >
                      {respuesta?.toString() || ""}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}