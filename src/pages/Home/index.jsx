import { useState } from 'react';
import linkData from '../../source/link.json';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if(loading) return;
    setResponseContent('');
    setLoading(true);
    try {
      const response = await fetch('https://api.coze.cn/v3/chat', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer pat_pIESnGVz7fpD0TRZY7wcgyRkjIa90PghwjsLqUlDineRyPF1UifSfbBFkn84uMLK',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "bot_id": "7478327189952823330",
          "user_id": "123123bas2123",
          "stream": true,
          "auto_save_history": true,
          "additional_messages": [
            {
              "role": "user",
              "content": searchTerm,
              "content_type": "text"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      
      // 创建流式读取器
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // 持续读取数据
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        // 解码数据块
        const chunk = decoder.decode(value, { stream: true });
        if(chunk.startsWith('event:done')) break;
        if(chunk.startsWith('event:conversation.message.completed')) {
          let data = chunk.replaceAll('event:conversation.message.completed', '').replaceAll('data:', '').replaceAll('\n\n', '');
          data = JSON.parse(data);
          if(data.type == 'tool_response') {
            const content = JSON.parse(data.content);
            setResponseContent(content.output)
            setLoading(false);
            break;
          }
        }

      }

    } catch (error) {
      setLoading(false);
      console.error('Error sending message:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white text-center mb-6">探索前端开发资源</h1>
            <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="搜索工具、框架、库..."
            className="w-full px-5 py-3 rounded-full border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <svg 
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
            </div>
          </div>
        </div>
          <div className='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>

          {loading && <span>思考中</span>}
            <div dangerouslySetInnerHTML={{__html: responseContent}}></div>
          </div>

        {/* 主要内容区 */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* 分类展示区 */}
        {linkData.dev.map((category) => (
          <section key={category.id} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{category.cat}</h2>
              <span className="text-sm text-gray-500">{category.desc}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.list.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50">
                    {item.icon?.name ? (
                      <img 
                        src={`/logo/${item.icon.name}`} 
                        alt={item.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-medium"
                        style={{ backgroundColor: item.icon?.color || '#6b7280' }}
                      >
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {item.desc}
                      </p>
                      {item.have && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.have.split('|').map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.family && item.group && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.group.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-600 hover:text-blue-600"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Home;