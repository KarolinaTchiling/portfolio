import AudioPlayer from "./components/AudioPlayer";

const mixes = [
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/QUEPASE.wav",
    title: "Que Pase",
    details: "MIRRO - May the 4th be with you 2026",
  },
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/apr15_solo.wav",
    title: "SOLO YOLO",
    details: "MIRRO - Apr.15.2026",
  },
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/b2b.wav",
    title: "b2b w/ bae",
    details: "MIRRO b2b SUDS - Apr.10.2026",
  },
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/TECHNO.flac",
    title: "TECHNO (says no one)",
    details: "MIRRO - Sept.5.2025",
  },
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/6yrs.flac",
    title: "6yrs w/ my baby",
    details: "MIRRO - Jun.15.2025",
  },
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/sundayfunday.flac",
    title: "Sunday funday",
    details: "MIRRO - Jun.8.2025",
  },
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/BryBry_First_Set.flac",
    title: "SUDS (self-titled...obvi)",
    details: "SUDS (CELEBRITY PLANT) - May.29.2025",
  },
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/sunset.flac",
    title: "PiNk SkIeS and PiNoT GrIgO",
    details: "MIRRO - May.25.2025",
  },
  {
    audio: "https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/1stset.mp3",
    title: "1st SET - best bday present ever :P",
    details: "MIRRO - May.19.2025",
  },
];


export default function DJPage() {
  return (
    <div className="dj-page">
      <header className="dj-header">
        <h1>M<span>I</span>RRO</h1>
        <p>DJ Mixes &amp; Sets</p>
      </header>

      {mixes.map((mix) => (
        <AudioPlayer key={mix.audio} {...mix} />
      ))}
    </div>
  );
}