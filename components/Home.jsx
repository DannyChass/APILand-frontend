import styles from '../styles/Home.module.css';
import Button from './ui/Button';
import InputText from './ui/InputText';
import ApiCarousel from './ui/ApiCarousel';
import Header from './Header';

function Home() {
  const placeholder = "Username";
  return (
    <div>
      <Header />
      <main className={styles.main}>
        
        <ApiCarousel />
      </main>
    </div>
  );
}

export default Home;