import type { ReactNode } from "react";

type PageSlideProps = {
  title: string;
  children: ReactNode;
};

export default function PageSlide({ title, children }: PageSlideProps) {
  return (
    <div className="absolute inset-0 z-30 overflow-auto bg-yellow px-6 py-8 text-lg text-purple">
      <div className="relative z-20 flex min-h-full w-full items-center justify-center">
        <div className="w-full">
          <h2 className="font-title mb-4 text-center text-4xl uppercase text-purple">{title}</h2>
          <div className="flex items-center justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
