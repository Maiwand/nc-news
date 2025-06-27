const Loading = ({ message = "", variant = "page-loader" }) => {
  const isInline = variant === "inline-loader";

  const containerClass = isInline
    ? "loading-inline-container"
    : "loading-page-container col-span-3";

  const spinnerClass = isInline ? "spinner-inline" : "spinner-page";

  return (
    <div className={containerClass}>
      <div className={spinnerClass} />
      {!isInline && message && <p className="loading-text">{message}</p>}
    </div>
  );
};

export default Loading;
