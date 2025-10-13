export function AdBanner() {
  return (
    <div className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4">
        <a
          href="https://cvmtv.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity"
        >
          <img
            src="/cvmtv-banner.png"
            alt="Watch Now on CVMTV.com"
            className="w-full h-auto"
          />
        </a>
      </div>
    </div>
  );
}
