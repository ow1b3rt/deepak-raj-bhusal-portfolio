export function Logo({ panel }) {
  return (
    <div className="flex w-full items-center">
      {panel ? (
        <img src="/images/drb-logo.png" alt="Logo" className="h-auto w-full object-contain" />
      ) : (
        <img
          src="/images/web-logo.png"
          alt="Logo"
          className="h-auto w-full rounded-md object-contain"
        />
      )}
    </div>
  );
}
