import Sidebar from './Sidebar';
import MapComponent from './mapComponent';
import Login from './Login';

function Home() {
    const isLoggedIn = false; // Change this to your actual login state
    
    return (
      <div>
          {isLoggedIn ? (
              <div>
                  <Sidebar />
                  <MapComponent />
              </div>
          ) : (
              <div>
                  <Login />
              </div>
          )}
      </div>
    );
  }
  
  export default Home;
