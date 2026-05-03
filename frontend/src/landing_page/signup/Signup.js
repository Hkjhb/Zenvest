import OpenAccount from "../OpenAccount";

function Signup() {
  const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "/";

  return (
    <>
      <div className="container p-5">
        <div className="row text-center mb-5">
          <h1 className="mt-5">Open your Zenvest simulator account</h1>
          <p className="fs-5 text-muted">
            Practice stock trading with virtual funds, simulated orders, and a
            portfolio dashboard built for learning.
          </p>
        </div>

        <div className="row justify-content-center g-4 mb-5">
          <div className="col-md-4">
            <div className="p-4 brand-card h-100 text-center">
              <h2 className="mb-3" style={{ color: "var(--brand-amber)" }}>1</h2>
              <p className="fw-semibold mb-1">Create practice access</p>
              <p className="text-muted">
                Enter the simulator dashboard without connecting a real trading
                account, bank account, identity document, or payment method.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 brand-card h-100 text-center">
              <h2 className="mb-3" style={{ color: "var(--brand-amber)" }}>2</h2>
              <p className="fw-semibold mb-1">Use virtual funds</p>
              <p className="text-muted">
                Place practice buy orders and watch how simulated holdings,
                positions, and funds update.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 brand-card h-100 text-center">
              <h2 className="mb-3" style={{ color: "var(--brand-amber)" }}>3</h2>
              <p className="fw-semibold mb-1">Review performance</p>
              <p className="text-muted">
                Track orders, portfolio value, and profit/loss to understand
                how trading choices affect outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div>
            <a
              href={dashboardUrl}
              className="p-3 btn btn-primary fs-5"
              style={{ width: "280px", margin: "0 auto" }}
            >
              Open simulator dashboard
            </a>
            <p className="text-muted mt-3">
              Already practicing?{" "}
              <a href={dashboardUrl} className="brand-link">Go to dashboard</a>
            </p>
          </div>
        </div>
      </div>

      <OpenAccount />
    </>
  );
}

export default Signup;
