import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPassword as setPasswordAPI } from '../../fetch/authFetch';

const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password and confirm password do not match.');
            return;
        }
        setLoading(true);
        setMessage('');

        try {
            const responseMessage = await setPasswordAPI(password, confirmPassword);
            setMessage(responseMessage);
            navigate('/dashboard'); // Redirect to login page after successful password set
        } catch (error: any) {
            setMessage(error.message || 'An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="card-title text-center">Set Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="password" className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full pl-10"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirmPassword" className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input input-bordered w-full pl-10"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {message && (
                        <div className="alert alert-error shadow-lg mt-4">
                            <div>
                                <i className="fas fa-exclamation-circle"></i>
                                <span>{message}</span>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SetPassword;
