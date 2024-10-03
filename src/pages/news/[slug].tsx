

import { useRouter } from 'next/router';  

const BlogPost = () => {  
  const router = useRouter();  
  const { slug } = router.query;  

  const postContent = {  
    title: slug,  
    date: '2023-01-01',  
    content: '這是文章的詳細內容...',  
  };  

  return (  
    <div className="p-4">  
      <h1 className="text-4xl font-bold text-awsOrange">{postContent.title}</h1>  
      <p className="text-gray-600">{postContent.date}</p>  
      <div className="mt-4">  
        <p>{postContent.content}</p>  
      </div>  
    </div>  
  );  
};  

export default BlogPost;