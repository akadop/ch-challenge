import { Result } from '../hooks/useProfileList'

interface CardProps {
  profile: Result
}

export const SkeletonCard = () => {
  return (
    <div className="relative flex items-start space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm">
      <div className="flex min-w-0 flex-1 animate-pulse flex-col space-y-3">
        <div className="h-2 w-32 rounded bg-slate-300" />
        <div className="mb-2 h-2 w-16 rounded bg-slate-200" />
        <div className="h-2 rounded bg-slate-200" />
      </div>
    </div>
  )
}

export const Card: React.FC<CardProps> = ({ profile: { name, username, bio, current_room } }) => {
  const { is_speaker } = current_room
  return (
    <div className="relative flex items-start space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div className="min-w-0 flex-1 focus:outline-none">
        <div className="text-md flex items-center">
          <p className="font-extrabold text-black">{name}</p>
          {is_speaker && <p className="ml-1 text-lg">💬</p>}
        </div>
        <p className="mb-2 text-sm text-gray-500">@{username}</p>
        <p className="prose text-sm text-gray-700 line-clamp-2">{bio}</p>
      </div>
    </div>
  )
}
