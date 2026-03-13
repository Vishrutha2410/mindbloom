import { useNavigate } from 'react-router-dom';

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();
  return (
    <div className="card fade-in hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(activity.route || '/dashboard')}>
      <div className="text-4xl mb-3">{activity.icon}</div>
      <h3 className="font-bold text-lg mb-1">{activity.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{activity.description}</p>
      <span className="text-xs bg-bloom-green/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-medium">
        ⏱ {activity.duration}
      </span>
    </div>
  );
}
