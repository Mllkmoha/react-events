import { useIsFetching } from "@tanstack/react-query";

export default function Header({ children }) {
  const isFetching = useIsFetching();

  return (
    <>
      <div id="main-header-loading"></div>
      {isFetching > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <progress />
        </div>
      )}
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
