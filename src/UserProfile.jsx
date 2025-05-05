import { useState } from 'react';

function UserProfile() {
  // Mock user data (replace with real data from backend or localStorage)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+373 999 999 999',
    notifications: true,
  });



  // State for editing user details
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // State for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle input changes for user details
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // Save user details
  const handleSave = () => {
    if (!formData.name || !formData.email) {
      setErrorMessage('Name and email are required.');
      return;
    }
    setUser({ ...formData });
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setErrorMessage('');
    // In a real app, save to backend or localStorage here
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
    setErrorMessage('');
  };

  // Update password
  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New password and confirmation do not match.');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }
    // In a real app, verify currentPassword and update password in backend
    setSuccessMessage('Password updated successfully!');
    setErrorMessage('');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-textLight dark:text-textDark p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-lg">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* User Details Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                  required
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                  required
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                />
              ) : (
                <p>{user.phone}</p>
              )}
            </div>
            <div>
              <label htmlFor="notifications" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span>Receive email notifications</span>
              </label>
            </div>
          </div>
        </section>

        {/* Password Update Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              />
            </div>
            <button
              onClick={handlePasswordUpdate}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Update Password
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default UserProfile;