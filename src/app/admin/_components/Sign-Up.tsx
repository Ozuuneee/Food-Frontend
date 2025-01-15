import React, { useState } from "react";

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="app-container">
      <div className="form-container">
        {step === 1 && (
          <div className="form-step">
            <h2>Step 1: Email</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={nextStep} disabled={!email}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h2>Step 2: Create Password</h2>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep} disabled={!password}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h2>Review Your Info</h2>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Password:</strong> {"*".repeat(password.length)}
            </p>
            <button onClick={prevStep}>Back</button>
            <button>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
