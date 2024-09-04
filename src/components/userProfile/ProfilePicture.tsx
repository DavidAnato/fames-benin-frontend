import React, { useState } from 'react';
import { editUserProfile } from '../../fetch/authFetch';

interface ProfilePictureProps {
    currentPictureUrl: string | null;
    onProfilePictureChange: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ currentPictureUrl, onProfilePictureChange }) => {
    const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancelProfilePictureChange = () => {
        setNewProfilePicture(null);
        setPreview(null);
    };

    const handleSaveProfilePictureChange = async () => {
        if (newProfilePicture) {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append('profile_picture', newProfilePicture);
                await editUserProfile(formData);
                onProfilePictureChange();
                setNewProfilePicture(null);
                setPreview(null);
            } catch (error) {
                console.error('Error updating profile picture:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex justify-center">
            {preview && (
                <button onClick={handleCancelProfilePictureChange} className="border-3 z-10 btn btn-error bg-white btn-outline btn-circle -mr-12" disabled={isLoading}>
                    <i className="fas fa-times text-2xl "></i>
                </button>
        )}

            {preview ? (
                <div
                    className="w-48 h-48 rounded-full border-4 border-white -mt-32"
                    style={{ backgroundImage: `url(${preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            ) : currentPictureUrl ? (
                <div
                    className="w-48 h-48 rounded-full border-4 border-white -mt-32"
                    style={{ backgroundImage: `url(${currentPictureUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            ) : (
                <div className="w-48 h-48 rounded-full border-4 border-white -mt-32 bg-gray-200 flex items-center justify-center">
                    <i className="fas fa-user text-[100px] text-gray-500"></i>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-picture-input"
                onChange={handleProfilePictureChange}
            />
            <label htmlFor="profile-picture-input" className="border-3 change-photo border-white btn btn-circle -ml-12">
                <i className="fas fa-edit text-2xl text-gray-500"></i>
            </label>
            {preview && (
                <button onClick={handleSaveProfilePictureChange} className="border-3 border-white btn btn-accent btn-circle -ml-12" disabled={isLoading}>
                    {isLoading ? <i className="fas fa-spinner fa-spin text-2xl text-white"></i> : <i className="fas fa-check text-2xl text-white"></i>}
                </button>
            
            )}
        </div>
    );
};

export default ProfilePicture;