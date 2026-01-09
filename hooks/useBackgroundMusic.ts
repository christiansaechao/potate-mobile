import { useEffect, useRef } from "react";
import { createAudioPlayer } from "expo-audio";
import type { AudioPlayer } from "expo-audio";

const playlist: number[] = [
  require("@/assets/audio/lofi-default.mp3"),
  require("@/assets/audio/lofi-jazz.mp3"),
  require("@/assets/audio/lofi-calm.mp3"),
  require("@/assets/audio/lofi-piano.mp3"),
];

export function useAmbientMusic(isSound: boolean) {
  const playerRef = useRef<AudioPlayer | null>(null);
  const trackIndexRef = useRef(0);

  useEffect(() => {
    const player = createAudioPlayer(playlist[0]);
    player.volume = 0.4;

    // go next when finished
    const sub = player.addListener("playbackStatusUpdate", (status) => {
      if (!status.isLoaded) return;

      if (status.didJustFinish) {
        trackIndexRef.current = (trackIndexRef.current + 1) % playlist.length;

        player.replace(playlist[trackIndexRef.current]);
        player.play();
      }
    });

    playerRef.current = player;

    if (isSound) player.play();

    return () => {
      sub?.remove?.();
      player.remove();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isSound) player.play();
    else player.pause();
  }, [isSound]);
}
