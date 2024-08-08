// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import useUserProfile from '../hooks/user';
// import useAuthStore from '../store/authStore';

// const UserProfile: React.FC = () => {
//     const navigate = useNavigate();
//     const { user, clearAuth } = useAuthStore();
//     const { user: profile } = useUserProfile();

//     const handleLogout = () => {
//         clearAuth();
//         navigate('/login');
//     };

//     if (!user) {
//         navigate('/login');
//         return null;
//     }

//     return (
//         <div>
//             <div className="container mx-auto p-4">
//                 <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//                 <button onClick={handleLogout} className="btn btn-secondary mb-4">
//                     Logout
//                 </button>
//                 {profile ? (
//                     <div className="card shadow-lg">
//                         <div className="card-body">
//                             <h2 className="card-title">{profile.first_name} {profile.last_name}</h2>
//                             <p>{profile.email}</p>
//                             <p>{profile.is_staff ? 'Staff' : 'User'}</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <p>Loading profile...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { fetchUserProfile, UserProfile as UserProfileType } from '../fetch/authFetch';

const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfileType | null>(null);
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();

    useEffect(() => {
        let isMounted = true;

        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUserProfileData = async () => {
            try {
                const profileData = await fetchUserProfile();
                if (isMounted) {
                    setProfile(profileData);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        // Fetch user profile only when the component is first mounted and user is authenticated
        fetchUserProfileData();

        return () => {
            isMounted = false;
        };
    }, [user, navigate]);  // Remove `profile` from dependencies to prevent the infinite loop

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <div>
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
        </div>
    );
};

export default UserProfile;
