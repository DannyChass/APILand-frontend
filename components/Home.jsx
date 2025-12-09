import styles from '../styles/Home.module.css';
import Button from './ui/Button';
import InputText from './ui/InputText';

function Home() {
  const placeholder = 'Username'
  return (
    <div>
      <main className={styles.main}>
        <h1 className="font-bold text-3xl">
          Welcome to <a href="https://nextjs.org">Next.js la team!</a>
          <Button className= "w">appuie</Button>
          <InputText placeholder={placeholder} ></InputText>
        </h1>
      </main>
    </div>
  );
}

export default Home;