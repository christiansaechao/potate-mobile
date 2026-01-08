import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

const ambientMusic = require("@/assets/audio/ambient.mp3");
const lofiJazz1 = require("@/assets/audio/lofi-jazz-1.mp3");
const lofiJazz2 = require("@/assets/audio/lofi-jazz-2.mp3");

export const useBackgroundMusic = (isSound: boolean) => {
  const [currSong, setCurrSong] = useState(0);

  const musicList = {
    0: lofiJazz1,
    1: lofiJazz2,
  };

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSound = async () => {
      try {
        // Avoid double-loading
        if (soundRef.current) return;

        const { sound } = await Audio.Sound.createAsync(ambientMusic, {
          isLooping: true,
          volume: 0.4,
          shouldPlay: isSound,
        });

        if (!isMounted) return;

        soundRef.current = sound;

        if (isSound) {
          await sound.playAsync();
        }
      } catch (err) {
        console.log("Error loading ambient music:", err);
      }
    };

    loadSound();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const toggle = async () => {
      if (!soundRef.current) return;

      try {
        if (isSound) {
          await soundRef.current.playAsync();
        } else {
          await soundRef.current.pauseAsync();
        }
      } catch (err) {
        console.log("Error toggling sound:", err);
      }
    };

    toggle();
  }, [isSound]);

  useEffect(() => {
    return () => {
      // cleanup when app exits/unmounts
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, []);
};
