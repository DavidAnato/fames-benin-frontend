import React, { useState, useEffect } from 'react';
import { editUserProfile } from '../../fetch/authFetch'; // Import the editUserProfile function

interface SettingsFormProps {
  title: string;
  fields: { name: string; type: string; label: string; value?: string; options?: string[] }[];
  onFormSubmit?: () => void; // Add this line
}

const SettingsForm: React.FC<SettingsFormProps> = ({ title, fields, onFormSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>(() => {
    const initialFormData: { [key: string]: any } = {};
    fields.forEach(field => {
      initialFormData[field.name] = field.value || '';
    });
    return initialFormData;
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await editUserProfile(formData);
      console.log('Updated User:', updatedUser);
      if (onFormSubmit) onFormSubmit(); // Call the callback function
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="btn btn-ghost btn-sm">
        <i className="fas fa-edit"></i>
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg lg:w-1/2 md:w-2/3 w-[90%] mx-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute text-4xl top-2 right-5 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor={field.name}>
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      id={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      id={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-xl"
                    >
                      {field.options?.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-xl btn mr-2"
                >
                  <i className="fas fa-times mr-2"></i>Cancel
                </button>
                <button type="submit" className="rounded-xl btn btn-accent">
                  <i className="fas fa-check mr-2"></i>Submit
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsForm;
