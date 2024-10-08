import { Route } from 'react-router-dom';
import Login from '../components/authComponents/login';
import Register from '../components/authComponents/register';
import EmailValidateRequest from '../components/authComponents/emailValidateRequest';
import ActiveEmail from '../components/authComponents/activeEmail';
import PasswordResetRequest from '../components/authComponents/passwordResetRequest';
import PasswordResetConfirm from '../components/authComponents/passwordResetConfirm';
import SetPassword from '../components/authComponents/setPassword';
import ChangePassword from '../components/authComponents/changePassword';

const AuthRoutes = [
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route key="email-verification" path="/email-verification" element={<EmailValidateRequest />} />,
  <Route key="active-email" path="/active-email" element={<ActiveEmail />} />,
  <Route key="password-reset-request" path="/password-reset-request" element={<PasswordResetRequest />} />,
  <Route key="password-reset-confirm" path="/password-reset-confirm" element={<PasswordResetConfirm />} />,
  <Route key="set-password" path="/set-password" element={<SetPassword />} />,
  <Route key="change-password" path="/change-password" element={<ChangePassword />} />,
];

export default AuthRoutes;
