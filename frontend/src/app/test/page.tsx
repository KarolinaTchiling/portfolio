
import ThreeCanvas from '../../components/ThreeCanvas';
import RectAreaLightScene from '../../components/RectAreaLightScene';
import Knot from '../../components/TorusKnot';
import Font from '../../components/Font';

const Page: React.FC = () => {
    return (
        <>
        <div className="">
            {/* <ThreeCanvas /> */}
            {/* <RectAreaLightScene /> */}
            {/* < Font /> */}
            < Knot />
      </div>
      </>
    );
};

export default Page;


// export default function Page() {
//     return (
//       <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
//         <h1>Hello, testing page!</h1>
//       </div>
//   )}  



// const Home: React.FC = () => {
//   return (
//     <>
//       <Head>
//         <title>My First Three.js App</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </Head>
//       <ThreeCanvas />
//     </>
//   );
// };

// export default Home;