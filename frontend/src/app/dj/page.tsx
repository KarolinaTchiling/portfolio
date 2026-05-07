"use client";
import { useEffect } from "react";

export default function DJPage() {
  useEffect(() => {
    class AudioPlayer {
      constructor(audioPlayer: Element) {
        const self = this as any;
        self.audioPlayer = audioPlayer;
        self.audio = audioPlayer.querySelector("audio");
        self.playing = false;
        self.title = audioPlayer.querySelector(".title");
        self.details = audioPlayer.querySelector(".details");
        self.playPauseButton = audioPlayer.querySelector(".playpause-button");
        self.playpauseButtons = audioPlayer.querySelectorAll(".playpause-button");
        self.audioPlayer.dataset.playing = "false";

        self.playpauseButtons.forEach((playpauseButton: any) => {
          playpauseButton.addEventListener("playpause", (e: any) => {
            self.audioItem = e.detail;
            if (self.audio.src !== playpauseButton.dataset.audio) {
              self.playing = false;
              self.loadAudioItem();
            }
            self.playPause();
          });
        });

        self.timeRange = audioPlayer.querySelector('input[type="range"]');
        self.timeOutput = audioPlayer.querySelector(".current");
        self.timeDuration = audioPlayer.querySelector(".duration");

        self.timeRange.addEventListener("input", () => {
          self.audio.currentTime = self.timeRange.value;
        });
        self.audio.addEventListener("timeupdate", () => {
          self.timeRange.value = self.audio.currentTime;
          self.timeOutput.textContent = self.toTime(self.timeRange.value);
        });
      }

      loadAudioItem() {
        const self = this as any;
        self.title.innerHTML = self.playPauseButton.dataset.title = self.audioItem.title;
        self.details.innerHTML = self.playPauseButton.dataset.details = self.audioItem.details;
        self.audio.src = self.playPauseButton.dataset.audio = self.audioItem.audio;
        self.audio.load();
        self.audio.addEventListener("loadedmetadata", () => {
          self.timeRange.value = 0;
          self.timeRange.max = self.audio.duration;
          self.timeDuration.textContent = self.toTime(self.audio.duration);
        }, false);
        self.audio.addEventListener("ended", () => {
          self.audio.currentTime = 0;
          self.playPause();
        }, false);
      }

      playPause() {
        const self = this as any;
        if (self.playing) {
          self.audio.pause();
          self.playing = false;
        } else {
          self.audio.play();
          self.playing = true;
        }
        self.playpauseButtons.forEach((button: any) => {
          const parent = button.parentElement;
          if (button.dataset.audio === self.audio.src) {
            parent.dataset.playing = self.playing ? "true" : "false";
            button.title = self.playing ? "Pause" : "Play";
          } else {
            parent.dataset.playing = "false";
            button.title = "Play";
          }
          self.audioPlayer.dataset.playing = self.playing ? "true" : "false";
        });
      }

      toTime(seconds: number) {
        const hr = Math.floor(seconds / 3600);
        const min = Math.floor((seconds - hr * 3600) / 60);
        let sec: any = Math.floor(seconds - hr * 3600 - min * 60);
        if (sec < 10) sec = "0" + sec;
        return min + ":" + sec;
      }
    }

    class Playpause {
      constructor(el: Element) {
        const self = this as any;
        self.playPause = el;
        self.audio = (el as any).dataset.audio;
        self.title = (el as any).dataset.title;
        self.details = (el as any).dataset.details;
        self.rta = (el as any).dataset.rta ? true : false;

        const rtaMarkup = `<div class="rta"><div></div><div></div><div></div><div></div></div>`;
        const markup = `
          ${self.rta ? rtaMarkup : ""}
          <button class="playpause-button" title="Play"
            data-audio="${self.audio}"
            data-title="${self.title}"
            data-details="${self.details}">
            <span class="play">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z" fill="currentColor"/></svg>
            </span>
            <span class="pause">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM9 9v6h2V9H9zm4 0v6h2V9h-2z" fill="currentColor"/></svg>
            </span>
          </button>`;

        el.insertAdjacentHTML("beforeend", markup);
        const btn = el.querySelector("button")!;
        btn.addEventListener("click", (e) => {
          const event = new CustomEvent("playpause", {
            detail: { audio: self.audio, title: self.title, details: self.details }
          });
          (e.target as HTMLElement).blur();
          (e.target as HTMLElement).dispatchEvent(event);
        });
      }
    }

    document.querySelectorAll(".playpause").forEach((el) => new Playpause(el));
    document.querySelectorAll(".audio-player").forEach((el) => new AudioPlayer(el));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --color-bg: #0a0a0a;
          --color-surface: #111111;
          --color-border: #222222;
          --color-primary: #ff3c00;
          --color-primary-intense: #ff6a00;
          --color-text: #f0ece4;
          --color-muted: #555;
          --border-width: 1px;
          --border-radius: 2px;
          --space-sm: 1rem;
          --space-md: 1.5rem;
          --font-display: 'Bebas Neue', sans-serif;
          --font-body: 'DM Mono', monospace;
        }

        body {
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-body);
          min-height: 100vh;
        }

        .dj-page {
          max-width: 52rem;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
        }

        .dj-header {
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 2rem;
        }

        .dj-header h1 {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 10vw, 7rem);
          letter-spacing: 0.02em;
          line-height: 0.9;
          color: var(--color-text);
        }

        .dj-header h1 span {
          color: var(--color-primary);
        }

        .dj-header p {
          margin-top: 1rem;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-muted);
        }

        /* Audio Player */
        .audio-player {
          border: var(--border-width) solid var(--color-border);
          padding: var(--space-md);
          border-radius: var(--border-radius);
          background: var(--color-surface);
          position: relative;
          margin-bottom: 2rem;
          transition: border-color 0.2s ease;
        }

        .audio-player[data-playing="true"] {
          border-color: var(--color-primary);
        }

        .audio-player button.playpause-button {
          position: absolute;
          top: -2.5rem;
          right: -2.5rem;
          width: 5rem;
          height: 5rem;
        }

        .audio-player-description {
          min-height: 3.75rem;
          margin-right: var(--space-md);
        }

        .audio-player-description .title {
          font-family: var(--font-display);
          font-size: 2rem;
          letter-spacing: 0.05em;
          color: var(--color-text);
        }

        .audio-player-description .details {
          opacity: 0.5;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-top: 0.4rem;
        }

        .audio-header {
          display: flex-end;
          gap: var(--space-sm);
          align-items: flex-start;
        }

        .timeline {
          margin: 1rem 0 0.5rem;
          width: 100%;
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          background: var(--color-border);
          outline: none;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px;
          height: 10px;
          background: var(--color-primary);
          border-radius: 50%;
          cursor: pointer;
        }

        .time-controls {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--color-muted);
        }

        /* Playpause button */
        .playpause { position: relative; }

        button.playpause-button {
          all: unset;
          color: var(--color-primary);
          cursor: pointer;
          display: block;
          height: 3rem;
          width: 3rem;
          flex-shrink: 0;
          transition: color 0.15s ease;
        }

        button.playpause-button:hover { color: var(--color-primary-intense); }

        button.playpause-button > * { pointer-events: none; }

        button.playpause-button svg {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        button.playpause-button[title="Play"] .play { display: block; }
        button.playpause-button[title="Play"] .pause { display: none; }
        button.playpause-button[title="Pause"] .play { display: none; }
        button.playpause-button[title="Pause"] .pause { display: block; }

        [data-playing="false"] .pause { display: none; }
        [data-playing="true"] .play { display: none; }

        /* RTA bars */
        .rta {
          transition: opacity 0.2s ease-in-out;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          top: 0.75rem;
          left: 0.5rem;
          width: 2rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
        }

        .rta > * {
          background: var(--color-primary);
          height: 100%;
          width: 0.2rem;
          border-radius: var(--border-radius);
        }

        [data-playing="true"] .rta { opacity: 1; }
        [data-playing="true"] .rta > *:nth-child(1) { animation: volume-1 1s ease infinite; }
        [data-playing="true"] .rta > *:nth-child(2) { animation: volume-2 0.8s ease infinite; }
        [data-playing="true"] .rta > *:nth-child(3) { animation: volume-2 1.5s ease infinite; }
        [data-playing="true"] .rta > *:nth-child(4) { animation: volume-1 2s ease infinite; }
        [data-playing="true"] .rta + button .pause { opacity: 0; }
        [data-playing="true"]:hover .rta { opacity: 0; }
        [data-playing="true"]:hover .rta + button .pause { opacity: 1; }

        @keyframes volume-1 {
          0%,100% { height: 60%; } 20% { height: 55%; } 40% { height: 70%; } 60% { height: 55%; } 80% { height: 65%; }
        }
        @keyframes volume-2 {
          0%,100% { height: 100%; } 20% { height: 80%; } 40% { height: 90%; } 60% { height: 70%; } 80% { height: 90%; }
        }

        /* Playlist */
        .playlist-label {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-muted);
          margin-bottom: 0.75rem;
        }

        .playlist { list-style: none; }

        .playlist-item {
          border-top: var(--border-width) solid var(--color-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.9rem 0;
          transition: background 0.15s ease;
        }

        .playlist-item:last-child {
          border-bottom: var(--border-width) solid var(--color-border);
        }

        .playlist-item .title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          color: var(--color-text);
        }

        .playlist-item .details {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-muted);
          margin-top: 0.3rem;
        }
      `}</style>

      <div className="dj-page">
        <header className="dj-header">
          <h1>M<span>I</span>RRO</h1>
          <p>DJ Mixes &amp; Sets</p>
        </header>

        <div className="audio-player">
          <audio preload="metadata"></audio>
          <div className="audio-header">
            <div
              className="playpause"
              data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/QUEPASE.wav"
              data-title="Que Pase - May the 4th be w/ u ('26)"
              data-details="MIRRO"
            ></div>
            <div className="audio-player-description">
              <h3 className="title">Que Pase - May the 4th be w/ u ('26)</h3>
              <h4 className="details">MIRRO</h4>
            </div>
          </div>
          <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
          <div className="time-controls">
            <div className="current">0:00</div>
            <div className="duration">0:00</div>
          </div>
        </div>


        <div className="audio-player">
          <audio preload="metadata"></audio>
          <div className="audio-header">
            <div className="audio-player-description">
              <h3 className="title">SOLO YOLO - Apr 15th 2026</h3>
              <h4 className="details">MIRRO</h4>
            </div>
            <div
              className="playpause"
              data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/apr15_solo.wav"
              data-title="SOLO YOLO - Apr 15th 2026"
              data-details="MIRRO"
            ></div>
          </div>
          <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
          <div className="time-controls">
            <div className="current">0:00</div>
            <div className="duration">0:00</div>
          </div>
        </div>


        <div className="audio-player">
          <audio preload="metadata"></audio>
          <div className="audio-header">
            <div className="audio-player-description">
              <h3 className="title">b2b w/ bae - Apr 10th 2026</h3>
              <h4 className="details">MIRRO b2b SUDS</h4>
            </div>
            <div
              className="playpause"
              data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/b2b.wav"
              data-title="b2b w/ bae - Apr 10th 2026"
              data-details="MIRRO b2b SUDS"
            ></div>
          </div>
          <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
          <div className="time-controls">
            <div className="current">0:00</div>
            <div className="duration">0:00</div>
          </div>
        </div>


        <div className="audio-player">
          <audio preload="metadata"></audio>
          <div className="audio-header">
            <div className="audio-player-description">
              <h3 className="title">TECHNO (says who???) - Sept 5th 2025</h3>
              <h4 className="details">MIRRO</h4>
            </div>
            <div
              className="playpause"
              data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/TECHNO.flac"
              data-title="TECHNO (says who???) - Sept 5th 2025"
              data-details="MIRRO"
            ></div>
          </div>
          <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
          <div className="time-controls">
            <div className="current">0:00</div>
            <div className="duration">0:00</div>
          </div>
        </div>

        <div className="audio-player">
          <audio preload="metadata"></audio>
          <div className="audio-header">
            <div className="audio-player-description">
              <h3 className="title">6yrs w/ my baby - July 15th 2025</h3>
              <h4 className="details">MIRRO</h4>
            </div>
            <div
              className="playpause"
              data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/6yrs.flac"
              data-title="6yrs w/ my baby - July 15th 2025"
              data-details="MIRRO"
            ></div>
          </div>
          <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
          <div className="time-controls">
            <div className="current">0:00</div>
            <div className="duration">0:00</div>
          </div>
        </div>


        <div className="audio-player">
          <audio preload="metadata"></audio>
          <div className="audio-header">
            <div className="audio-player-description">
              <h3 className="title">PiNk SkIeS and PiNgO GrIgO - June 8th 2025 </h3>
              <h4 className="details">MIRRO</h4>
            </div>
            <div
              className="playpause"
              data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/sunset.flac"
              data-title="PiNk SkIeS and PiNgO GrIgO - June 8th 2025"
              data-details="MIRRO"
            ></div>
          </div>
          <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
          <div className="time-controls">
            <div className="current">0:00</div>
            <div className="duration">0:00</div>
          </div>
        </div>


        <div className="audio-player">
          <audio preload="metadata"></audio>
          <div className="audio-header">
            <div className="audio-player-description">
              <h3 className="title">SUDS (self-titled...obvi) - May 29th 2025</h3>
              <h4 className="details">SUDS (CELEBRITY PLANT)</h4>
            </div>
            <div
              className="playpause"
              data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/BryBry_First_Set.flac"
              data-title="SUDS (self-titled...obvi) - May 29th 2025"
              data-details="SUDS (CELEBRITY PLANT)"
            ></div>
          </div>
          <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
          <div className="time-controls">
            <div className="current">0:00</div>
            <div className="duration">0:00</div>
          </div>
        </div>


        <div className="audio-player">
          <audio preload="metadata"></audio>
          <div className="audio-header">
            <div className="audio-player-description">
              <h3 className="title">1st SET EVER (I'm just turned 28) :P - May 19th 2025 </h3>
              <h4 className="details">MIRRO</h4>
            </div>
            <div
              className="playpause"
              data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/1stset.mp3"
              data-title="1st SET EVER (I just turned 28 :P) - May 19th 2025 "
              data-details="MIRRO"
            ></div>
          </div>
          <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
          <div className="time-controls">
            <div className="current">0:00</div>
            <div className="duration">0:00</div>
          </div>
        </div>
        
        




        {/* <div className="audio-playlist">
          <p className="playlist-label">Tracklist</p>
          <ol className="playlist">
            <li className="playlist-item">
              <div className="playlist-item-description">
                <h3 className="title">Que Pase</h3>
                <h4 className="details">Karolina</h4>
              </div>
              <div className="playlist-item-controls">
                <div
                  className="playpause"
                  data-rta="true"
                  data-audio="https://pub-5390d0d6e5e349a081ad95c328bdcd09.r2.dev/QUEPASE.wav"
                  data-title="Que Pase"
                  data-details="Karolina"
                ></div>
              </div>
            </li>
          </ol>
        </div> */}
      </div>
    </>
  );
}
