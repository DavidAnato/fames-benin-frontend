import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activateEmail } from '../../fetch/authFetch';

const ActiveEmail = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const email = localStorage.getItem('email') || '';
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await activateEmail(email, otp);
            setMessage(response.message);
            if (response.success) {
                navigate('/login');
            }
        } catch (error: any) {
            setMessage(error.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="card-title text-center">Activate Email</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="otp" className="label">
                            <span className="label-text">OTP</span>
                        </label>
                        <input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Enter OTP"
                            maxLength={5}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {message && <div className="alert alert-error shadow-lg">
                    <div>
                        <i className="fas fa-exclamation-circle"></i>
                        <span>{message}</span>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default ActiveEmail;
