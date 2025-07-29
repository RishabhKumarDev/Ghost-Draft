// src/components/GhostLoader.jsx

function GhostLoader({text="Loading ghostly data..."}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      {/* Ghost Body */}
      <div className="relative w-20 h-24 animate-[float_3s_ease-in-out_infinite]">
        {/* Head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-zinc-400 rounded-t-full 
                        shadow-[0_0_40px_rgba(255,255,255,0.3),0_0_60px_rgba(251,191,36,0.3)]" />

        {/* Eyes */}
        <div className="absolute top-6 left-[30%] w-2.5 h-2.5 bg-zinc-800 rounded-full z-10" />
        <div className="absolute top-6 right-[30%] w-2.5 h-2.5 bg-zinc-800 rounded-full z-10" />

        {/* Wavy bottom */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between items-end px-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i === 1 ? "bg-amber-300" : "bg-zinc-100"
              } shadow-[0_0_12px_rgba(251,191,36,0.6)] animate-[wave_2s_ease-in-out_infinite]`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Text */}
      <p className="text-amber-100 text-sm mt-4 italic animate-pulse tracking-wide">
        {text}
      </p>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }
      `}</style>
    </div>
  );
}

export default GhostLoader;
