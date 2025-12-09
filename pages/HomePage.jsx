import styles from '../styles/Home.module.css';
import Button from '../components/ui/Button';
import InputText from '../components/ui/InputText';
import ApiCarousel from '../components/ui/ApiCarousel';
import Header from '../components/Header';

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