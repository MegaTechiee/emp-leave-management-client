import AuthContainer from "@/components/Auth/AuthContainer/AuthContainer";
import "./auth-layout.css"

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout" data-testid="auth-layout">
      <div>
        <AuthContainer>
          {children}
        </AuthContainer>
      </div>
    </div>
  );
}
