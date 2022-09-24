import PushNotificationLayout from "../components/PushNotificationLayout";
import Searchbar from "../components/searchbar/Searchbar";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
      <div>
      {/* className={styles.main} */}
        <main>
          <h2>Home Page</h2>
          <Searchbar/>
        </main>
      </div>

  );
}