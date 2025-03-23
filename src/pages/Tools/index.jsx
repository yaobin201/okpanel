import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Tools = () => {
  const { viewType } = useParams();
  const { dataSource } = useSelector((state) => state.global);

  function formatViewTypeName() {
    if (viewType === "profile") {
      return "Fast Start";
    } else {
      const dataInfo = dataSource.find((item) => item.id === viewType);
      return dataInfo.cat;
    }
  }

  function renderProfile() {
    return <div>profile</div>;
  }

  function renderChildList() {
    if (viewType === "profile") {
      return renderProfile();
    } else {
      const dataInfo = dataSource.find((item) => item.id === viewType);
      return (
        <div className="grid grid-cols-3 gap-5">
          {dataInfo.list.map((item) => renderSubItem(item))}
        </div>
      );
    }
  }

  function renderSubItem(item) {
    return (
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
                style={{ backgroundColor: item.icon?.color || "#6b7280" }}
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
                {item.have.split("|").map((tag) => (
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
    );
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {formatViewTypeName()}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {renderChildList()}
        </div>
      </main>
    </>
  );
};

export default Tools;
