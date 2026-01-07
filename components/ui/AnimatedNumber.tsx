import { useEffect, useState } from "react";
import { StyleProp, TextStyle, TextProps } from "react-native";

import { CustomText } from "../custom";

interface AnimatedNumberProps extends TextProps {
  value: number;
  duration?: number;
  formatter?: (val: number) => string;
}

export function AnimatedNumber({
  value,
  duration = 1000,
  formatter = (val) => Math.floor(val).toString(),
  style,
  ...rest
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out expo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = Math.floor(easeOut * value);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return (
    <CustomText style={style} {...rest}>
      {formatter(displayValue)}
    </CustomText>
  );
}
