import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { fetchUserProfile, UserProfile as UserProfileType } from '../fetch/authFetch';
import useUserProfile from '../hooks/user';
import SettingsForm from '../components/settingsComponents/settingsForm';
import ProfilePicture from '../components/userProfile/ProfilePicture';
import ProfileCover from '../components/userProfile/ProfileCover';
import { useTranslation } from 'react-i18next';

const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfileType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();
    const { user: staticUser } = useUserProfile();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
          const elementId = hash.substring(1);
          const element = document.getElementById(elementId);
          if (element) {
            const yOffset = -70;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        } else {
          window.scrollTo(0, 0);
        }
      }, []);
    
    useEffect(() => {
        let isMounted = true;

        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUserProfileData = async () => {
            try {
                setIsLoading(true);
                const profileData = await fetchUserProfile();
                if (isMounted) {
                    setProfile(profileData);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setIsLoading(false);
            }
        };

        fetchUserProfileData();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    const reloadUserProfile = async () => {
        try {
            setIsLoading(true);
            const profileData = await fetchUserProfile();
            setProfile(profileData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setIsLoading(false);
        }
    };
    const { t } = useTranslation(); // Hook pour gérer la traduction

    if (!user) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    
    return (
        <div className="general-element">
        <ProfileCover currentCoverUrl={profile?.profile_cover || null} onCoverChange={reloadUserProfile} />
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl p-6 relative -mt-32 mx-auto mb-10">
                {profile ? (
                    <>
                        <ProfilePicture
                            currentPictureUrl={profile.profile_picture || profile.picture_url}
                            onProfilePictureChange={reloadUserProfile}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div>
                                <div className="card bg-base-100 shadow-md rounded-lg">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center">
                                            <h2 className="card-title font-bold">{t("BasicInformation")}</h2>
                                            <SettingsForm
                                                title={t("BasicInformation")}
                                                fields={[
                                                    { name: 'first_name', type: 'text', label: t('Prénom'), value: profile.first_name || '' },
                                                    { name: 'last_name', type: 'text', label: t('Nom'), value: profile.last_name || '' },
                                                    { name: 'date_of_birth', type: 'date', label: t('DateOfBirth'), value: profile.date_of_birth || '' },
                                                    { name: 'gender', type: 'select', label: t('Gender'), value: profile.gender || '', options: ['', 'male', 'female', 'other'] },
                                                    { name: 'phone_number', type: 'text', label: t('PhoneNumber'), value: profile.phone_number || '' },
                                                    { name: 'email', type: 'email', label: 'E-mail', value: profile.email || '' },
                                                ]}
                                                onFormSubmit={reloadUserProfile}
                                            />
                                        </div>
                                        <p className="flex items-center"><i className="fas fa-user mr-2"></i><strong className="mr-1">{t("Prénom")} :</strong> {profile.first_name || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-user mr-2"></i><strong className="mr-1">{t("Nom")}</strong> {profile.last_name || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-calendar-alt mr-2"></i><strong className="mr-1">{t("DateOfBirth")}</strong> {profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-venus-mars mr-2"></i><strong className="mr-1">{t("Gender")} :</strong> {profile.gender || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-phone mr-2"></i><strong className="mr-1">{t("PhoneNumber")} :</strong> {profile.phone_number || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-envelope mr-2"></i><strong className="mr-1">E-mail :</strong> {profile.email || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow-md rounded-lg mt-4">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center">
                                            <h2 className="card-title font-bold">{t("LocationInformation")}</h2>
                                            <SettingsForm
                                                title={t("LocationInformation")}
                                                fields={[
                                                    { name: 'city', type: 'text', label: t('City'), value: profile.city || '' },
                                                    { name: 'country', type: 'text', label: t('Country'), value: profile.country || '' },
                                                ]}
                                                onFormSubmit={reloadUserProfile}
                                            />
                                        </div>
                                        <p className="flex items-center"><i className="fas fa-city mr-2"></i><strong className="mr-1">{t("City")}</strong> {profile.city || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-flag mr-2"></i><strong className="mr-1">{t("Country")}</strong> {profile.country || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card bg-base-100 shadow-md rounded-lg">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center">
                                            <h2 className="card-title font-bold">{t("Status")}</h2>
                                        </div>
                                        <p className="flex items-center"><i className="fas fa-user-check mr-2"></i><strong className="mr-1">{t("Active")}</strong> {profile.is_active ? 'Yes' : 'No'}</p>
                                        <p className="flex items-center"><i className="fas fa-user-shield mr-2"></i><strong className="mr-1">{t("Staff")}</strong> {profile.is_staff ? 'Yes' : 'No'}</p>
                                        <p className="flex items-center"><i className="fas fa-calendar-alt mr-2"></i><strong className="mr-1">{t("DateJoined")}</strong> {profile.date_joined ? new Date(profile.date_joined).toLocaleDateString() : 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-calendar-alt mr-2"></i><strong className="mr-1">{t("LastLogin")}</strong> {profile.last_login ? new Date(profile.last_login).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow-md rounded-lg mt-4">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center">
                                            <h2 className="card-title font-bold">{t("Bio")}</h2>
                                            <SettingsForm
                                                title={t("Bio")}
                                                fields={[
                                                    { name: 'bio', type: 'textarea', label: t('Bio'), value: profile.bio || '' },
                                                ]}
                                                onFormSubmit={reloadUserProfile}
                                            />
                                        </div>
                                        <p className="flex "><i className="fas fa-info-circle mt-1 mr-2"></i> {profile.bio || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6 space-x-4">
                            <Link
                                to="/change-password"
                                className="btn btn-info btn-outline btn-sm px-6 rounded-xl"
                            >
                                <i className="fas fa-key mr-2"></i>{t("ChangePassword")}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="btn btn-error btn-outline btn-sm px-6 rounded-xl"
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>{t("Logout")}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <ProfilePicture
                            currentPictureUrl={staticUser?.profile_picture || staticUser?.picture_url}
                            onProfilePictureChange={reloadUserProfile}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div>
                                <div className="card bg-base-100 shadow-md rounded-lg">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center">
                                            <h2 className="card-title font-bold">{t("BasicInformation")}</h2>
                                            <SettingsForm
                                                title={t("BasicInformation")}
                                                fields={[
                                                    { name: 'first_name', type: 'text', label: t('FirstName'), value: staticUser?.first_name || '' },
                                                    { name: 'last_name', type: 'text', label: t('LastName'), value: staticUser?.last_name || '' },
                                                    { name: 'date_of_birth', type: 'date', label: t('DateOfBirth'), value: staticUser?.date_of_birth || '' },
                                                    { name: 'gender', type: 'select', label: t('Gender'), value: staticUser?.gender || '', options: ['', 'male', 'female', 'other'] },
                                                    { name: 'phone_number', type: 'text', label: t('PhoneNumber'), value: staticUser?.phone_number || '' },
                                                    { name: 'email', type: 'email', label: t('EmailAddress'), value: staticUser?.email || '' },
                                                ]}
                                                onFormSubmit={reloadUserProfile}
                                            />
                                        </div>
                                        <p className="flex items-center"><i className="fas fa-user mr-2"></i><strong className="mr-1">{t("Prénom")} :</strong> {staticUser?.first_name || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-user mr-2"></i><strong className="mr-1">{t("Nom")}</strong> {staticUser?.last_name || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-calendar-alt mr-2"></i><strong className="mr-1">{t("DateOfBirth")}</strong> {staticUser?.date_of_birth ? new Date(staticUser.date_of_birth).toLocaleDateString() : 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-venus-mars mr-2"></i><strong className="mr-1">{t("Gender")} :</strong> {staticUser?.gender || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-phone mr-2"></i><strong className="mr-1">{t("PhoneNumber")} :</strong> {staticUser?.phone_number || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-envelope mr-2"></i><strong className="mr-1">E-mail :</strong> {staticUser?.email || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow-md rounded-lg mt-4">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center">
                                            <h2 className="card-title font-bold">{t("LocationInformation")}</h2>
                                            <SettingsForm
                                                title={t("LocationInformation")}
                                                fields={[
                                                    { name: 'city', type: 'text', label: t('City'), value: staticUser?.city || '' },
                                                    { name: 'country', type: 'text', label: t('Country'), value: staticUser?.country || '' },
                                                ]}
                                                onFormSubmit={reloadUserProfile}
                                            />
                                        </div>
                                        <p className="flex items-center"><i className="fas fa-city mr-2"></i><strong className="mr-1">{t("City")}</strong> {staticUser?.city || 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-flag mr-2"></i><strong className="mr-1">{t("Country")}</strong> {staticUser?.country || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card bg-base-100 shadow-md rounded-lg">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center">
                                            <h2 className="card-title font-bold">{t("Status")}</h2>
                                        </div>
                                        <p className="flex items-center"><i className="fas fa-user-check mr-2"></i><strong className="mr-1">{t("Active")}</strong> {staticUser?.is_active ? 'Yes' : 'No'}</p>
                                        <p className="flex items-center"><i className="fas fa-user-shield mr-2"></i><strong className="mr-1">{t("Staff")}</strong> {staticUser?.is_staff ? 'Yes' : 'No'}</p>
                                        <p className="flex items-center"><i className="fas fa-calendar-alt mr-2"></i><strong className="mr-1">{t("DateJoined")}</strong> {staticUser?.date_joined ? new Date(staticUser.date_joined).toLocaleDateString() : 'N/A'}</p>
                                        <p className="flex items-center"><i className="fas fa-calendar-alt mr-2"></i><strong className="mr-1">{t("LastLogin")}</strong> {staticUser?.last_login ? new Date(staticUser.last_login).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow-md rounded-lg mt-4">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center">
                                            <h2 className="card-title font-bold">{t("Bio")}</h2>
                                            <SettingsForm
                                                title={t("Bio")}
                                                fields={[
                                                    { name: 'bio', type: 'textarea', label: t('Bio'), value: staticUser?.bio || '' },
                                                ]}
                                                onFormSubmit={reloadUserProfile}
                                            />
                                        </div>
                                        <p className="flex "><i className="fas fa-info-circle mt-1 mr-2"></i> {staticUser?.bio || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link
                                to="/change-password"
                                className="btn btn-info btn-outline btn-sm px-6 py-2 sm:rounded-xl rounded-lg w-full sm:w-auto"
                            >
                                <i className="fas fa-key mr-2"></i>{t("ChangePassword")}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="btn btn-error btn-outline btn-sm px-6 py-2 sm:rounded-xl rounded-lg w-full sm:w-auto"
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>{t("Logout")}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
