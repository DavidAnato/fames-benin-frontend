import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { fetchUserProfile, UserProfile as UserProfileType } from '../fetch/authFetch';

const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfileType | null>(null);
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            // Fetch the current user's profile
            fetchUserProfileData();
        }
    }, [user, navigate]);

    const fetchUserProfileData = async () => {
        try {
            const profileData = await fetchUserProfile();
            if (profileData) {
                setProfile(profileData);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <button onClick={handleLogout} className="btn btn-secondary mb-4">
                Logout
            </button>
            {profile ? (
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title">{profile.first_name} {profile.last_name}</h2>
                        <p>{profile.email}</p>
                        <p>{profile.is_staff ? 'Staff' : 'User'}</p>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default UserProfile;

