const ITEMS = (
  <>
    YEARS_EXP: <b>03</b> &nbsp;·&nbsp; EFICIÊNCIA: <b>+1000%</b> &nbsp;·&nbsp; MAPEAMENTO:{" "}
    <b>800 SKUs/10min</b> &nbsp;·&nbsp; CASES: <b>04</b> &nbsp;·&nbsp; BASED: <b>SP/BR</b>{" "}
    &nbsp;·&nbsp; ATUALMENTE: <b>RETAIL MEDIA ANALYST @ CADASTRA</b> &nbsp;·&nbsp;{" "}
  </>
);

export default function Ticker() {
  return (
    <div className="home-ticker" aria-hidden="true">
      <span className="track">
        {ITEMS}
        {ITEMS}
      </span>
    </div>
  );
}
