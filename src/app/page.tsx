// import Splash from '../components/homepage/splash'
import Feature from '../components/homepage/feature'
import NewsHeader from '../components/homepage/newsHeader'
import LeaderboardDisplay from '../components/homepage/leaderboardDisplay'
import IndependentGames from '../components/homepage/independent'
import Hero from '../components/homepage/hero'


export default function Home() {
  return (
    <div>
      {/* <Splash /> */}
      <Hero />
      <Feature />
      <NewsHeader />
      <LeaderboardDisplay />
      <IndependentGames />
    </div>
  );
}
