// import Splash from '../components/homepage/splash'
import Feature from '../components/homepage/feature'
import LeaderboardDisplay from '../components/homepage/leaderboardDisplay'
import IndependentGames from '../components/homepage/independent'


export default function Home() {
  return (
    <div>
      {/* <Splash /> */}
      <Feature />
      <LeaderboardDisplay />
      <IndependentGames />
    </div>
  );
}
