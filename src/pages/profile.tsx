// src/pages/profile.tsx  
import React from 'react';  

const Profile: React.FC = () => {  
  return (  
    <div className="container mx-auto px-4 py-8">  
      <h1 className="text-4xl font-bold text-center mb-6">個人資料</h1>  
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">  
        <form>  
          <div className="mb-4">  
            <label className="block text-gray-700">姓名</label>  
            <input  
              type="text"  
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"  
            />  
          </div>  
          <div className="mb-4">  
            <label className="block text-gray-700">電子郵件</label>  
            <input  
              type="email"  
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"  
            />  
          </div>  
          <button  
            type="submit"  
            className="w-full mt-4 bg-primary text-white p-2 rounded hover:bg-purple-700 transition duration-200"  
          >  
            保存更改  
          </button>  
        </form>  
      </div>  
    </div>  
  );  
};  

export default Profile;