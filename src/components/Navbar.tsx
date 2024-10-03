
// import React from 'react';  
// import Link from 'next/link';  

// const Navbar: React.FC = () => {  
//   return (  
//     <nav className="bg-gray-800 text-white p-4">  
//       <div className="container mx-auto flex justify-between items-center">  
//         <Link href="/" className="text-lg font-bold">AWS Blog</Link>  
//         <div>  
//           <Link href="/login" className="mr-4 hover:text-gray-300">登入</Link>  
//           <Link href="/register" className="mr-4 hover:text-gray-300">註冊</Link>  
//           <Link href="/blog" className="mr-4 hover:text-gray-300">文章列表</Link>  
//           <Link href="/about" className="hover:text-gray-300">關於</Link>  
//         </div>  
//       </div>  
//     </nav>  
//   );  
// };  

// export default Navbar;

// src/components/Navbar.tsx  
import React from 'react';  
import Link from 'next/link';  

const Navbar: React.FC = () => {  
  return (  
    <nav className="bg-gray-800 p-4">  
      <div className="container mx-auto flex justify-between items-center">  
        <div className="text-white">  
          <Link href="/" className="text-lg font-bold">AWS Blog</Link>  
        </div>  
        <div className="space-x-4">  
          <Link href="/news" className="text-white hover:underline">最新新聞</Link>  
          <Link href="/knowledge" className="text-white hover:underline">知識庫</Link>  
          <Link href="/login" className="text-white hover:underline">登入</Link>  
        </div>  
      </div>  
    </nav>  
  );  
};  

export default Navbar;