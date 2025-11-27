import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import { CategoryProvider } from "./context/CategoryContext";
import { BudgetProvider } from "./context/BudgetContext";
import { SavingGoalProvider } from "./context/SavingGoalContext";
import { IncomeProvider } from "./context/IncomeContext.jsx";
import "./index.css";

// eslint-disable-next-line react-refresh/only-export-components
function ProvidersWrapper({ children }) {
  return (
    <IncomeProvider>
      <CategoryProvider>
        <BudgetProvider>
          <SavingGoalProvider>
            <ExpenseProvider>
              {children}
            </ExpenseProvider>
          </SavingGoalProvider>
        </BudgetProvider>
      </CategoryProvider>
    </IncomeProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthContext.Consumer>
          {({ user, loadingAuth }) => {
            if (loadingAuth) return <div>Loading...</div>;
            // Only load other contexts when user exists
            if (!user) return <App />;

            return (
              <ProvidersWrapper>
                <App />
              </ProvidersWrapper>
            );
          }}
        </AuthContext.Consumer>
      </BrowserRouter>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
