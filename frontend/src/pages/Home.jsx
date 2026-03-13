import { Link } from 'react-router-dom';
import QuoteBox from '../components/QuoteBox.jsx';

const features = [
  { icon:'😊', title:'Mood Tracker',    desc:'Log how you feel daily and get personalised activity suggestions.',     link:'/mood'       },
  { icon:'🎮', title:'Relaxing Games',  desc:'Bubble pop, memory cards, puzzles — fun ways to melt away stress.',     link:'/games'      },
  { icon:'🎨', title:'Drawing Board',   desc:'Express yourself freely on an interactive creative canvas.',             link:'/draw'       },
  { icon:'📚', title:'Reading Zone',    desc:'Motivational stories, quotes, and mindfulness articles.',                link:'/reading'    },
  { icon:'🧘', title:'Meditation',      desc:'Guided breathing animations and calm meditation sessions.',              link:'/meditation' },
  { icon:'📊', title:'Dashboard',       desc:'Track your mood history, streaks, and activity completions.',           link:'/dashboard'  },
];

export default function Home({ user }) {
  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bloom-green/30 via-bloom-lavender/20 to-bloom-blue/30 py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-7xl mb-4">🌸</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
            MindBloom
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2 italic">"Relax, Refresh, and Let Your Mind Bloom."</p>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Your personal mental wellness companion — track moods, play relaxing games, draw, meditate, and grow every day.
          </p>
          {user ? (
            <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">Go to Dashboard 🏠</Link>
          ) : (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register" className="btn-primary text-lg px-8 py-3">Get Started Free 🌱</Link>
              <Link to="/login"    className="btn-secondary text-lg px-8 py-3">Login</Link>
            </div>
          )}
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-bloom-green/20 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-bloom-lavender/20 blur-2xl" />
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">Everything You Need to Feel Better</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Six powerful tools for mental wellness — all in one place.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <Link key={f.title} to={user ? f.link : '/register'}
              className="card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <QuoteBox />
      </section>

      {/* Emergency Support */}
      <section className="bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800 py-10 px-4 text-center">
        <div className="text-3xl mb-2">🚨</div>
        <h3 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400">Need Immediate Support?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">If you're in crisis, please reach out to a professional immediately.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="tel:iCall" className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition">📞 iCall: 9152987821</a>
          <a href="https://www.vandrevalafoundation.com" target="_blank" rel="noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition">🌐 Vandrevala Foundation</a>
          <a href="tel:AASRA" className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition">☎️ AASRA: 98204 45522</a>
        </div>
      </section>
    </div>
  );
}
