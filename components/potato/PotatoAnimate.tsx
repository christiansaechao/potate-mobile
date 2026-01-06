import { useEffect, useState } from "react";
import { Image, View } from "react-native";

const frame1 = require("@/assets/images/idle-1.png");
const frame2 = require("@/assets/images/idle-2.png");
const frame3 = require("@/assets/images/idle-3.png");

const frames = [frame1, frame2, frame3];

export default function PotatoSprite() {
  const [index, setIndex] = useState(0);

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

  return (
    <View>
      <Image
        source={frames[index]}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
        }}
      />
    </View>
  );
}
