import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../fetch/authFetch';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            return;
        }
        try {
            const responseMessage = await changePassword(oldPassword, newPassword, confirmPassword);
            setMessage(responseMessage);
            navigate('/dashboard'); // Redirect to login page after successful password change
        } catch (error: any) {
            setMessage(error.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="card-title text-center">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="oldPassword" className="label">
                            <span className="label-text">Old Password</span>
                        </label>
                        <input
                            id="oldPassword"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="input input-bordered w-full pl-10"
                            placeholder="Enter old password"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="newPassword" className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input input-bordered w-full pl-10"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirmPassword" className="label">
                            <span className="label-text">Confirm New Password</span>
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input input-bordered w-full pl-10"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
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

export default ChangePassword;
