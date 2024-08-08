import { LogIn } from "lucide-react";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://scontent.fdkr5-1.fna.fbcdn.net/v/t39.30808-6/316172778_653577529799252_5618512654851783641_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGGecuzT_Hc5NDtIoeAsAoUj_2DKjmaV3uP_YMqOZpXe4-tN54BsU963JMaKvrhyOJbXREXpAZPzz4nlzU1BRtI&_nc_ohc=S7oeEhix7xgQ7kNvgHWET6-&_nc_ht=scontent.fdkr5-1.fna&oh=00_AYBI1daC-tzkZfzNAY1NOoAO6Zya29lgJzIn7acdsNMfnA&oe=669AAD8B)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <h1 className="mb-5 text-5xl font-bold">Welcome to FAMES BENIN</h1>
          <p className="mb-5 text-lg">
          Our mission is to act as a center dedicated to the ongoing quest for development solutions within the framework of Sino-Beninese cooperation.
          <br />Join our community to uncover incredible opportunities.
          FAMES BENIN, your trusted partner for a better future.
          </p>
          <button className="btn md:btn-md lg:btn-lg btn-accent font-bold shadow-lg shadow-emerald-500/50"><LogIn />Get Stating</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
