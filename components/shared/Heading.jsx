export function Heading({ children, className }) {
  return (
    <h1 className={`text-2xl md:text-3xl xl:text-5xl self-center font-bold ${className}`}>
      {children}
    </h1>
  );
}
