import Svg, { Circle, G, Line, Path, Rect } from "react-native-svg";

interface IFallBackPotatoProps {
  mood: "happy" | "angry" | "sleepy" | "chaotic" | "cool";
  health: number;
}

export const FallBackPotato = ({ mood, health }: IFallBackPotatoProps) => {
  const isMad = mood === "angry" || mood === "chaotic" || health < 40;
  const isCool = mood === "cool";

  return (
    <Svg viewBox="0 0 200 200" width="100%" height="100%">
      <Path
        d="M40,120 Q30,180 100,190 Q170,180 160,120 Q170,50 100,40 Q30,50 40,120"
        fill={health < 40 ? "#8D6E63" : "#D7CCC8"}
        stroke="#5D4037"
        strokeWidth={4}
      />
      <Circle cx={60} cy={80} r={3} fill="#A1887F" opacity={0.5} />
      <Circle cx={130} cy={140} r={4} fill="#A1887F" opacity={0.5} />
      <Circle cx={150} cy={90} r={2} fill="#A1887F" opacity={0.5} />

      {/* Face */}
      <G transform="translate(0, 10)">
        {isCool ? (
          <>
            <Rect x={55} y={75} width={40} height={20} rx={5} fill="black" />
            <Rect x={105} y={75} width={40} height={20} rx={5} fill="black" />
            <Line
              x1={95}
              y1={85}
              x2={105}
              y2={85}
              stroke="black"
              strokeWidth={3}
            />
          </>
        ) : (
          <>
            <Circle cx={70} cy={85} r={isMad ? 4 : 6} fill="#3E2723" />
            <Circle cx={130} cy={85} r={isMad ? 4 : 6} fill="#3E2723" />
          </>
        )}

        {/* Mouth */}
        {health < 30 ? (
          <Path
            d="M80,130 Q100,120 120,130"
            fill="none"
            stroke="#3E2723"
            strokeWidth={3}
          />
        ) : isMad ? (
          <Path
            d="M85,135 Q100,125 115,135"
            fill="none"
            stroke="#3E2723"
            strokeWidth={3}
          />
        ) : (
          <Path
            d="M85,125 Q100,140 115,125"
            fill="none"
            stroke="#3E2723"
            strokeWidth={3}
          />
        )}

        {health > 80 && (
          <>
            <Circle cx={60} cy={100} r={5} fill="#FFAB91" opacity={0.6} />
            <Circle cx={140} cy={100} r={5} fill="#FFAB91" opacity={0.6} />
          </>
        )}
      </G>
    </Svg>
  );
};
