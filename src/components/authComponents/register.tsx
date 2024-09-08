import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { register } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import GoogleConnection from './googleConnection';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+229");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const countryCodes = ["+229", "+33", "+44", "+49", "+91"];
  const filteredCountryCodes = countryCodes.filter(code =>
    code.includes(searchTerm)
  );

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!countryCodes.includes(value)) {
      setCountryCode(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\s+/g, '')}`;

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: fullPhoneNumber,
      password: password,
      confirm_password: confirmPassword
    };

    try {
      const message = await register(payload);
      setMessage(message);
      navigate('/active-email');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  const { t } = useTranslation(); // Hook pour gérer la traduction

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-24 md:mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
        <div className="card w-full max-w-2xl shadow-2xl mt-12">
          <div className="card-body md:px-16">
            <div className="flex">
              <img
              src={famesLogo}
              alt="FAMES Logo"
              className="w-24 md:w-32 md:mb-0 md:mr-4 mr-0 mx-auto"
            />
            <h2 className="card-title text-center md:text-left text-2xl font-bold">{t("Register")}</h2></div>
            {message && <div className="alert alert-info">{message}</div>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="form-control flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="firstName" className="label">
                    <span className="label-text">{t("Prénom")}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input input-bordered w-full pl-10"
                      placeholder={t("YourFirstName")}
                      required
                    />
                    <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="lastName" className="label">
                    <span className="label-text">{t("Nom")}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input input-bordered w-full pl-10"
                      placeholder={t("YourName")}
                      required
                    />
                    <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                  </div>
                </div>
              </div>
              <div className="form-control flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="email" className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full pl-10"
                      placeholder={t("YourEmailAddress")}
                    />
                    <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="phoneNumber" className="label">
                    <span className="label-text">{t("PhoneNumber")}</span>
                  </label>
                  <div className="grid grid-cols-10 gap-2 input input-bordered items-center px-0">
                    <div className="relative col-span-3">
                      <i className="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                      <input
                        type="text"
                        className="pl-10 w-full focus:border-none"
                        placeholder="+229"
                        value={searchTerm || countryCode}
                        onChange={handleCountryCodeChange}
                        onFocus={() => setSearchTerm("+")}
                        onBlur={() => setTimeout(() => setSearchTerm(""), 200)}
                      />
                      {searchTerm && (
                        <div className="absolute bg-base-100 shadow-lg rounded w-full mt-1 max-h-40 overflow-y-auto z-10">
                          {filteredCountryCodes.map((code) => (
                            <div
                              key={code}
                              className={`p-2 cursor-pointer ${code === countryCode ? 'bg-base-300' : ''}`}
                              onMouseDown={() => {
                                setCountryCode(code);
                                setSearchTerm("");
                              }}
                            >
                              {code}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="relative col-span-7">
                      <input
                        type="num"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full focus:border-none"
                        placeholder={t("YourPhoneNumber ")}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-control flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="password" className="label">
                    <span className="label-text">{t("Password")}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full pl-10"
                      placeholder={t("YourPassword")}
                      required
                    />
                    <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="confirmPassword" className="label">
                    <span className="label-text">{t("ConfirmNewPassword")}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input input-bordered w-full pl-10"
                      placeholder={t("ConfirmNewPassword")}
                      required
                    />
                    <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                  </div>
                </div>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-accent font-bold shadow shadow-emerald-500/50 py-2 rounded-full hover:border-black"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <><i className="fas fa-user-plus mr-2"></i> {t("Register")}</>
                  )}
                </button>
              </div>
              <div className="divider">{t("OU")}</div>
              <div className="form-control">
              <GoogleConnection text={t("RegisterWithGoogle")}></GoogleConnection>
              </div>
            </form>
            <p className="mt-4 text-center">
              {t("account")}{" "}
              <Link to="/login" className="link link-primary hover:text-blue-500 text-blue-300">
                <i className="fas fa-sign-in-alt mr-1"></i>
                {t("Login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default Register;
