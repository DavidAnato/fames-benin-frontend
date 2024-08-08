import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailValidateRequest } from '../../fetch/authFetch';

const EmailValidateRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Clear message before attempting to send email
        try {
            const responseMessage = await emailValidateRequest(email);
            setMessage(responseMessage);
            localStorage.setItem('email', email);
            navigate('/active-email'); // Redirect to email activation page
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="card-title text-center">Email Validate Request</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="email" className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full pl-10"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
                {message && (
                    <div className="alert alert-error shadow-lg mt-4">
                        <div>
                            <i className="fas fa-exclamation-circle"></i>
                            <span>{message}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailValidateRequest;
