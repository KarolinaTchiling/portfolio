"use client";
import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  audio: string;
  title: string;
  details: string;
}

let currentlyPlaying: any = null;

export default function AudioPlayer({ audio, title, details }: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

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

        self.audio.src = (audioPlayer.querySelector(".playpause") as any)?.dataset.audio;
        self.audio.load();
        self.audio.addEventListener("loadedmetadata", () => {
          self.timeRange.max = self.audio.duration;
          self.timeDuration.textContent = self.toTime(self.audio.duration);
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
          // Pause whatever is currently playing
          if (currentlyPlaying && currentlyPlaying !== self) {
            currentlyPlaying.audio.pause();
            currentlyPlaying.playing = false;
            currentlyPlaying.audioPlayer.dataset.playing = "false";
            currentlyPlaying.playpauseButtons.forEach((btn: any) => {
              btn.title = "Play";
              btn.parentElement.dataset.playing = "false";
            });
          }
          self.audio.play();
          self.playing = true;
          currentlyPlaying = self;
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
        if (hr > 0) {
          const minPadded = min < 10 ? "0" + min : min;
          return hr + ":" + minPadded + ":" + sec;
        }
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

    containerRef.current.querySelectorAll(".playpause").forEach((el) => new Playpause(el));
    new AudioPlayer(containerRef.current!);
  }, []);

  return (
    <div className="audio-player" ref={containerRef}>
      <audio preload="metadata"></audio>
      <div className="audio-header">
        <div className="audio-player-description">
          <h3 className="title">{title}</h3>
          <h4 className="details">{details}</h4>
        </div>
        <div
          className="playpause"
          data-audio={audio}
          data-title={title}
          data-details={details}
        ></div>
      </div>
      <input className="timeline" title="time" type="range" min={0} max={0} step={1} />
      <div className="time-controls">
        <div className="current">0:00:00</div>
        <div className="duration">0:00:00</div>
      </div>
    </div>
  );
}