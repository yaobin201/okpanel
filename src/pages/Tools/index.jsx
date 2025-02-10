import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Tools = () => {
  const { viewType } = useParams()
  const { dataSource } = useSelector(state => state.global);

  function formatViewTypeName() {
    if (viewType === 'profile') {
      return 'Fast Start';
    } else {
      const dataInfo = dataSource.find(item => item.id === viewType)
      return dataInfo.cat;
    }
  }

  function renderProfile() {
    return <div>profile</div>
  }

  function renderChildList() {

    if (viewType === 'profile') {
      return renderProfile()
    } else {
      const dataInfo = dataSource.find(item => item.id === viewType)
      return (
        <div className='grid grid-cols-3 gap-5'>
          {
            dataInfo.list.map(item => renderSubItem(item))
          }
        </div>
      )
    }
  }

  function renderSubItem(source) {
    return (
      <div className='border border-slate-200 border-solid bg-white rounded-md p-4' key={source.name}>
        <div className='flex justify-between items-center pb-4'>
          <div>
            <h3 className='text-base text-slate-900'>{source.name}</h3>
            <p className='text-sm'>{source.have}</p>
          </div>
          <div>
            {
              source.icon?.name ? (
                <img className='h-6' src={`/logo/${source.icon.name}`} alt={source.name} />
              ) : (
                <div className='h-6' style={{ color: source.icon?.color || 'inherit' }}>{source.name}</div>
              )
            }
          </div>

        </div>
        <div className='border-t border-slate-200 border-solid text-sm text-slate-600 py-4'>
          {source.desc}
        </div>

      </div>
    )
  }

  return (<>
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{formatViewTypeName()}</h1>
      </div>
    </header>
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {
          renderChildList()
        }
      </div>
    </main>
  </>

  )
};

export default Tools;