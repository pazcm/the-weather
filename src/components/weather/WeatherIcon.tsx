import {
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Cloud,
  CloudSun,
  Cloudy,
  Moon,
  CloudMoon,
  Sun,
} from "lucide-react";
import { conditionFromCode } from "@/lib/weather";

type Props = {
  code: number;
  isDay?: boolean;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function WeatherIcon({ code, isDay = true, size = 24, className, strokeWidth = 1.6 }: Props) {
  const condition = conditionFromCode(code);
  const props = { size, className, strokeWidth, "aria-hidden": true as const };

  switch (condition) {
    case "clear":
      if (code === 1) return isDay ? <CloudSun {...props} /> : <CloudMoon {...props} />;
      return isDay ? <Sun {...props} /> : <Moon {...props} />;
    case "cloudy":
      return isDay ? <CloudSun {...props} /> : <CloudMoon {...props} />;
    case "overcast":
      return <Cloudy {...props} />;
    case "fog":
      return <CloudFog {...props} />;
    case "drizzle":
      return <CloudDrizzle {...props} />;
    case "rain":
      return <CloudRain {...props} />;
    case "snow":
      return <CloudSnow {...props} />;
    case "thunder":
      return <CloudLightning {...props} />;
    default:
      return <Cloud {...props} />;
  }
}
