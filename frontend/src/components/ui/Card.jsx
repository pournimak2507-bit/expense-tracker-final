export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-bg p-8 rounded-2xl shadow-[10px_10px_20px_#c5c5e6,-10px_-10px_20px_#ffffff]
      transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
