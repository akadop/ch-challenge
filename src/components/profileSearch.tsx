import { useProfileListParams, useProfileList } from '../hooks'
import { Card, SkeletonCard } from './card'

const onPageForward = useProfileListParams.getState().onPageForward
const onPageBackward = useProfileListParams.getState().onPageBackward
const onSearchChange = useProfileListParams.getState().onSearchChange

interface PaginationButton {
  ariaLabel: string
  handleClick: () => void
  isDisabled: boolean
  isLoading: boolean
  label: string
}

const PaginationButton: React.FC<PaginationButton> = ({ isDisabled, isLoading, handleClick, ariaLabel, label }) => (
  <button
    aria-label={ariaLabel}
    onClick={handleClick}
    disabled={isDisabled || isLoading}
    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
  >
    {label}
  </button>
)

const Pagination: React.FC = () => {
  const { canPageBackward, canPageForward, isFetching, page, count } = useProfileListParams()
  return (
    <nav className="flex items-center justify-between" aria-label="Pagination">
      {count > 0 && (
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            <span className="font-medium">{count}</span> result(s) on page {page}
          </p>
        </div>
      )}
      <div className="flex flex-1 justify-between space-x-2 sm:justify-end">
        <PaginationButton
          ariaLabel="Load previous results"
          handleClick={onPageBackward}
          isLoading={isFetching}
          isDisabled={!canPageBackward}
          label="Previous"
        />
        <PaginationButton
          ariaLabel="Load next results"
          handleClick={onPageForward}
          isLoading={isFetching}
          isDisabled={!canPageForward}
          label="Next"
        />
      </div>
    </nav>
  )
}

const Search: React.FC = () => (
  <div className="flex flex-col space-y-4">
    <div>
      <label htmlFor="search" className="block text-lg font-extrabold text-gray-700">
        Search online users
      </label>
      <div className="mt-1">
        <input
          className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-1/2 lg:w-1/4"
          id="search"
          name="search"
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search..."
          type="text"
        />
      </div>
    </div>
  </div>
)

const ProfileResults: React.FC = () => {
  const { data, isLoading } = useProfileList()

  if (isLoading) {
    return (
      <>
        {Array.from(Array(10), (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </>
    )
  }

  if (data) {
    const hasResults = data.results.length > 0
    if (hasResults) {
      return (
        <>
          {data.results.map(item => (
            <Card profile={item} key={item.id} />
          ))}
        </>
      )
    }

    return <div className="text-md">No Results Found</div>
  }

  return <div>MAYBE AN ERROR STATE!</div>
}

export const ProfileSearch: React.FC = () => (
  <div className="flex flex-col space-y-4">
    <Search />
    <Pagination />
    <div className="my-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProfileResults />
    </div>
  </div>
)
