import React, { useState, useEffect, useRef } from 'react';
import { editUserProfile } from '../../fetch/authFetch';

interface ProfileCoverProps {
    currentCoverUrl: string | null;
    onCoverChange: () => void;
}

const ProfileCover: React.FC<ProfileCoverProps> = ({ currentCoverUrl, onCoverChange }) => {
    const [newCover, setNewCover] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(0);
    const buttonRef = useRef<HTMLLabelElement | null>(null);

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewCover(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancelCoverChange = () => {
        setNewCover(null);
        setPreview(null);
    };

    const handleSaveCoverChange = async () => {
        if (newCover) {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append('profile_cover', newCover);
                await editUserProfile(formData);
                onCoverChange();
                setNewCover(null);
                setPreview(null);
            } catch (error) {
                console.error('Error updating profile cover:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (buttonRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                const distanceX = Math.max(buttonRect.left - event.clientX, event.clientX - buttonRect.right, 0);
                const distanceY = Math.max(buttonRect.top - event.clientY, event.clientY - buttonRect.bottom, 0);
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                // Calculer l'opacité en fonction de la distance (moins la distance est grande, plus l'opacité est élevée)
                const maxDistance = 200; // Distance maximale pour laquelle l'opacité sera de 40%
                const minOpacity = 0.1; // Opacité minimale
                const newOpacity = Math.max(1 - distance / maxDistance, minOpacity);
                setOpacity(newOpacity);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="relative h-[60vh] flex flex-col items-center justify-center p-4">
            {preview ? (
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: `url(${preview})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center center' }}
                />
            ) : currentCoverUrl ? (
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: `url(${currentCoverUrl})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center center' }}
                />
            ) : (
                <div className="absolute inset-0 bg-accent"></div>
            )}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="cover-input"
                onChange={handleCoverChange}
            />
            {preview ? (
                <div className="flex space-x-2 z-10">
                    <button onClick={handleCancelCoverChange} className="btn btn-error btn-outline bg-white rounded-xl relative sm:btn-sm" style={{ bottom: '-100px', left: '-100px' }} disabled={isLoading}>
                        <span className="hidden sm:inline">Cancel</span><i className="fas fa-times text-2xl "></i>
                    </button>
                    <button onClick={handleSaveCoverChange} className="btn btn-accent rounded-xl relative text-white sm:btn-sm" style={{ bottom: '-100px', right: '-100px' }} disabled={isLoading}>
                        <span className="hidden sm:inline">Save</span> {isLoading ? <i className="fas fa-spinner fa-spin text-2xl"></i> : <i className="fas fa-check text-2xl text-white"></i>}
                    </button>
                </div>
            ) : (
                <label
                    ref={buttonRef}
                    htmlFor="cover-input"
                    className="border-3 z-10 change-photo change-photo-btn btn mb-4 -mt-20"
                    style={{ opacity }}
                >
                    Edit Profile Cover<i className="fas fa-edit text-3xl rounded-xl text-gray-500"></i>
                </label>
            )}
        </div>
    );
};

export default ProfileCover;
