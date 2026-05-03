import OpenAccount from "../OpenAccount";

function Signup() {
  const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "/";

  return (
    <>
      <div className="container p-5">
        <div className="row text-center mb-5">
          <h1 className="mt-5">Open a free Zenvest account</h1>
          <p className="fs-5 text-muted">
            Modern platforms, ₹0 investment fees, and flat ₹20 intraday trades.
          </p>
        </div>

        <div className="row justify-content-center g-4 mb-5">
          <div className="col-md-4">
            <div className="p-4 brand-card h-100 text-center">
              <h2 className="mb-3" style={{ color: "var(--brand-amber)" }}>₹0</h2>
              <p className="fw-semibold mb-1">Account opening</p>
              <p className="text-muted">Free and instant online account opening with your Aadhaar and PAN.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 brand-card h-100 text-center">
              <h2 className="mb-3" style={{ color: "var(--brand-amber)" }}>₹0</h2>
              <p className="fw-semibold mb-1">Equity delivery</p>
              <p className="text-muted">Zero brokerage on all equity delivery trades and direct mutual fund investments.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 brand-card h-100 text-center">
              <h2 className="mb-3" style={{ color: "var(--brand-amber)" }}>₹20</h2>
              <p className="fw-semibold mb-1">Intraday &amp; F&amp;O</p>
              <p className="text-muted">Flat ₹20 per executed order for intraday, F&amp;O, currency, and commodity trades.</p>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div>
            <a
              href={dashboardUrl}
              className="p-3 btn btn-primary fs-5"
              style={{ width: "260px", margin: "0 auto" }}
            >
              Open your simulator account
            </a>
            <p className="text-muted mt-3">
              Already have an account?{" "}
              <a href={dashboardUrl} className="brand-link">Log in →</a>
            </p>
          </div>
        </div>
      </div>

      <OpenAccount />
    </>
  );
}

export default Signup;
