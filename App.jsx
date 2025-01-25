import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import User from './components/User';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (password.length < 8) {
      setError('Password must be 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password must be the same');
      return;
    }
    if (!/[!@#$%^&*()<>,."]/.test(password)) {
      setError('Password must contain a special character');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain a capital letter');
      return;
    }

    setUsers([...users, { fullName, email, password }]);
    toast.success('Login Successful ✅', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    setError('');
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-96">
          <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg flex flex-col gap-4">
            <h2 className="text-center text-2xl font-semibold mb-4">
              Create an Account
            </h2>
            <form onSubmit={submitHandle} className="flex flex-col gap-4">
              <input
                className="border border-gray-300 px-4 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="text"
                name="fullName"
                required
                placeholder="Enter Name here"
                value={formData.fullName}
                onChange={handleChanges}
              />
              <input
                className="border border-gray-300 px-4 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="email"
                name="email"
                required
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChanges}
              />
              <input
                className="border border-gray-300 px-4 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChanges}
                required
              />
              <input
                className="border border-gray-300 px-4 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChanges}
              />
              {error && (
                <p className="text-red-500 font-medium text-base text-center">
                  {error}
                </p>
              )}
              <button
                className="w-full bg-emerald-600 text-white font-semibold py-2 rounded hover:bg-emerald-700 transition"
                type="submit"
              >
                Submit
              </button>
              <p className="text-sm text-center mt-3 text-gray-500">
                By registering, you agree to our{' '}
                <a href="#" className="text-emerald-600 underline">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-emerald-600 underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
      {users.map((elem, idx) => (
        <User key={idx} elem={elem} />
      ))}
    </>
  );
};

export default App;
