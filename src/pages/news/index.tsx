import React, { useEffect, useState } from "react";  
import { SearchField, SwitchField, Pagination } from "@aws-amplify/ui-react";  
import "@aws-amplify/ui-react/styles.css";  

interface Article {  
  title: string;  
  description: string;  
  tags?: string[];  
  isFavorite: boolean;  
  createdAt: string;  
  author: string;  
}  

const articlesPerPage = 12; // 每頁顯示的文章數量  

const BlogList: React.FC = () => {  
  const [articles, setArticles] = useState<Article[]>([]);  
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);  
  const [currentArticles, setCurrentArticles] = useState<Article[]>([]);  
  const [currentPage, setCurrentPage] = useState(1); // 當前頁碼  
  const [totalPages, setTotalPages] = useState(0); // 總頁數量  
  const [gridView, setGridView] = useState<boolean>(false);  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);  
  const [showFavorites, setShowFavorites] = useState<boolean>(false);  
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");  
  const [searchValue, setSearchValue] = useState<string>("");  

  useEffect(() => {  
    const mockArticles: Article[] = Array.from({ length: 30 }, (_, index) => ({  
      title: `AWS 文章標題 ${index + 1}`,  
      description: `這是 AWS 文章 ${index + 1} 的詳細內容，提供關於技術的深入見解和分享。`,  
      tags: ["技術", "AWS"],  
      isFavorite: false,  
      createdAt: new Date(Date.now() - index * 86400000).toISOString(),  
      author: 'Daniel Zoltak',  
    }));  

    setArticles(mockArticles);  
  }, []);  

  useEffect(() => {  
    let updatedArticles = [...articles];  

    if (showFavorites) {  
      updatedArticles = updatedArticles.filter((article) => article.isFavorite);  
    }  

    if (searchValue) {  
      updatedArticles = updatedArticles.filter((article) =>  
        article.title.toLowerCase().includes(searchValue.toLowerCase())  
      );  
    }  

    updatedArticles.sort((a, b) => {  
      return sortOrder === "newest"  
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()  
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();  
    });  

    setFilteredArticles(updatedArticles);  
    setTotalPages(Math.ceil(updatedArticles.length / articlesPerPage));  

    if (currentPage > Math.ceil(updatedArticles.length / articlesPerPage)) {  
      setCurrentPage(Math.ceil(updatedArticles.length / articlesPerPage) || 1);  
    }  
  }, [articles, showFavorites, searchValue, sortOrder]);  

  useEffect(() => {  
    const startIndex = (currentPage - 1) * articlesPerPage;  
    const endIndex = startIndex + articlesPerPage;  
    setCurrentArticles(filteredArticles.slice(startIndex, endIndex));  
  }, [currentPage, filteredArticles]);  

  const handlePageChange = (newPage: number) => {  
    if (newPage > 0 && newPage <= totalPages) {  
      setCurrentPage(newPage);  
    }  
  };  

  const handleSearch = (value: string) => {  
    setSearchValue(value);  
  };  

  const toggleFavorite = (article: Article) => {  
    const updatedArticles = [...articles];  
    const originalIndex = articles.findIndex(  
      (a) => a.createdAt === article.createdAt  
    );  
    updatedArticles[originalIndex].isFavorite = !updatedArticles[originalIndex].isFavorite;  
    setArticles(updatedArticles);  
  };  

  const scrollToTop = () => {  
    window.scrollTo({ top: 0, behavior: "smooth" });  
  };  

  return (  
    <div className={`${  
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-900"  
      } flex flex-col min-h-screen`}  
    >  
      <div className="container mx-auto px-4 py-8 flex-grow">  
        <h1 className="text-5xl font-bold text-center mb-6">AWS 最新新聞</h1>  

        <div className="mb-4 flex items-center space-x-6">  
          <SwitchField  
            isDisabled={false}  
            label={  
              <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>  
                切換視圖  
              </span>  
            }  
            labelPosition="start"  
            isChecked={gridView}  
            onChange={(e) => setGridView(e.target.checked)}  
          />  
          <SwitchField  
            isDisabled={false}  
            label={  
              <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>  
                切換主題  
              </span>  
            }  
            labelPosition="start"  
            isChecked={isDarkMode}  
            onChange={(e) => setIsDarkMode(e.target.checked)}  
          />  
          <SwitchField  
            isDisabled={false}  
            label={  
              <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>  
                檢視收藏  
              </span>  
            }  
            labelPosition="start"  
            isChecked={showFavorites}  
            onChange={(e) => {  
              setShowFavorites(e.target.checked);  
              setCurrentPage(1);  
            }}  
          />  
          <div className="flex items-center">  
            <label className={`mr-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>  
              排序方式：  
            </label>  
            <select  
              value={sortOrder}  
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}  
              className={`border rounded p-1 ${  
                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-900"  
              }`}  
            >  
              <option value="newest">最新到最舊</option>  
              <option value="oldest">最舊到最新</option>  
            </select>  
          </div>  
        </div>  

        <div className="mb-4">  
          <SearchField  
            label="搜尋文章"  
            placeholder="搜尋文章"  
            hasSearchIcon={true}  
            hasSearchButton={false}  
            onChange={(event) => handleSearch(event.target.value)}  
            onClear={() => handleSearch("")}  
            value={searchValue}  
          />  
        </div>  

        <div className={`grid ${  
            gridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"  
          } gap-6`}  
        >  
          {currentArticles.length > 0 ? (  
            currentArticles.map((article, index) => (  
              <div  
                key={index}  
                className={`rounded-lg shadow-md p-4 cursor-pointer transition duration-200 ${  
                  isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"  
                }`}  
              >  
                <a  
                  href={`/article/${currentPage * articlesPerPage + index - articlesPerPage + 1}`}  
                  className={`text-3xl font-semibold mb-2 block ${  
                    isDarkMode ? "text-yellow-400" : "text-blue-800"  
                  } hover:text-blue-500 hover:underline transition-colors duration-200`}  
                  target="_blank"  
                  rel="noopener noreferrer"  
                >  
                  {article.title}  
                </a>  
                <div className="mb-2">  
                  {article.tags?.map((tag, i) => (  
                    <span  
                      key={i}  
                      className="bg-green-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"  
                    >  
                      {tag}  
                    </span>  
                  ))}  
                </div>  
                <div className={`info text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>  
                  {article.author}, {new Date(article.createdAt).toLocaleDateString('zh-TW', {  
                      year: 'numeric',  
                      month: 'long',  
                      day: 'numeric',  
                    })}  
                </div>  
                <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-900"}`}>  
                  {(article.description || '').substring(0, 100)}...  
                </p>  
                <button  
                  onClick={(e) => {  
                    e.stopPropagation();  
                    toggleFavorite(article);  
                  }}  
                  className={`text-white px-3 py-1 rounded transition duration-200 ${  
                    article.isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"  
                  }`}  
                >  
                  {article.isFavorite ? "已收藏" : "收藏"}  
                </button>  
              </div>  
            ))  
          ) : (  
            <p className="text-center text-gray-500 col-span-full">  
              未找到符合條件的文章，請嘗試不同的搜尋條件！  
            </p>  
          )}  
        </div>  
      </div>  

      <div className="flex justify-center mt-6 py-4">  
        <Pagination  
          currentPage={currentPage}  
          totalPages={totalPages}  
          onChange={handlePageChange}  
          onNext={() => handlePageChange(currentPage + 1)}  
          onPrevious={() => handlePageChange(currentPage - 1)}  
        />  
      </div>  

      {/* 回到頂部按鈕 */}  
      <button  
        onClick={scrollToTop}  
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"  
        title="回到頂部"  
      >  
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">  
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />  
        </svg>  
      </button>  
    </div>  
  );  
};  

export default BlogList;