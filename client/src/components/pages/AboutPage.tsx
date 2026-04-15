function AboutPage() {
  return (
    <div className="m-0 max-w-lg text-center space-y-4 text-purple-light">
      <h3 className="text-2xl mb-4 text-purple-dark">Here's what you need to know!</h3>
      <p>On May 1st, we feast for the 5th time at Delftse Hout.</p>
      <p>Grill smoke will fill the air, beer will flow and fun will follow.</p>
      <p>
        The Grill is based on good vibes, no entrance fee required. But we cannot feed everyone! So
        bring your own grill, your own food, your own fire, for you and your friends.
      </p>
      <p>
        We'll have some volley ball and badminton equipment up for grabs, as well as some activites
        for whoever wants to join! All we ask of you is to come grill, socialize and enjoy the sun!
      </p>
      <p className="font-bold">If you don't feed the flames, the flames won't feed you!</p>

      <h3 className="text-2xl mt-8 mb-4 text-purple-dark">This is not our first rodeo</h3>
      <p>
        {"Check out last year's website "}
        <a
          href="https://old2025.thegrill.live"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>.
      </p>
    </div>
  );
}

export default AboutPage;
