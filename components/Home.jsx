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
        
        <ApiCarousel title="Les apis de Daniel San" />
        <hr className='border border-stone-100 w-[70%]'/>
        <ApiCarousel title="le sommum du développeur" />
      </main>
    </div>
  );
}

export default Home;