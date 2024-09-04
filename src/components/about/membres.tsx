import React from 'react';
import { useTranslation } from 'react-i18next';

import membre0Photo from '../../assets/images/membres/membre1.png';
import membre1Photo from '../../assets/images/membres/membre2.png';
import membre2Photo from '../../assets/images/membres/membre3.png';
import membre3Photo from '../../assets/images/membres/membre4.png';
import membre4Photo from '../../assets/images/membres/membre5.png';

const About: React.FC = () => {
    const { t } = useTranslation();

    const membres = [
        {
            title: t('about.members.0.title'),
            name: t('about.members.0.name'),
            description: t('about.members.0.description'),
            photo: membre0Photo
        },
        {
            title: t('about.members.1.title'),
            name: t('about.members.1.name'),
            description: t('about.members.1.description'),
            photo: membre1Photo
        },
        {
            title: t('about.members.2.title'),
            name: t('about.members.2.name'),
            description: t('about.members.2.description'),
            photo: membre2Photo
        },
        {
            title: t('about.members.3.title'),
            name: t('about.members.3.name'),
            description: t('about.members.3.description'),
            photo: membre3Photo
        },
        {
            title: t('about.members.4.title'),
            name: t('about.members.4.name'),
            description: t('about.members.4.description'),
            photo: membre4Photo
        },
    ];

    return (
        <div className="bg-gray-100 py-10 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    {t('bureau')}
                </h2>
                <div className="flex flex-wrap justify-center">
                    {membres.map((member, index) => (
                        <div className='w-full lg:w-1/2 p-4'>
                            <div
                                key={index}
                                className="flex bg-slate-100 items-center p-6 rounded-xl shadow"
                            >
                                <img
                                    src={member.photo}
                                    alt={`Photo de ${member.name}`}
                                    className="w-32 h-32 object-cover rounded-full mr-4" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-lg font-semibold text-orange-600">
                                        {member.title}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
