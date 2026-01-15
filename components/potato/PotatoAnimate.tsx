import { useEffect, useState } from "react";
import { Image, View } from "react-native";

// --- Assets ---

const frame1 = require("@/assets/images/idle-1.png");
const frame2 = require("@/assets/images/idle-2.png");
const frame3 = require("@/assets/images/idle-3.png");

const bakedPotato = require("../../assets/images/default_stinky_animation-trans.gif");

const frames = [frame1, frame2, frame3];

export default function PotatoSprite() {
  // --- State ---

  const [index, setIndex] = useState(0);

  // --- Effects ---

  useEffect(() => {
    let forward = true;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (forward && prev === frames.length - 1) {
          forward = false;
          return prev - 1;
        }
        if (!forward && prev === 0) {
          forward = true;
          return prev + 1;
        }
        return forward ? prev + 1 : prev - 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // --- Render ---

  return (
    <View className="overflow-clip">
      <Image
        source={bakedPotato}
        style={{
          width: 350,
          height: 200,
          resizeMode: "contain",
        }}
        className="-z-10"
      />
    </View>
  );
}
