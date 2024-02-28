import { Loader } from "lucide-react"
import styles from "./spoke.module.css"

type CustomProperties = {
  "--speed"?: string
}

type Props = {
  color?: string
  size?: number
  opacity?: number
  speed?: number
} & CustomProperties

export default function SpokeSpinner({
  color = "black",
  size = 24,
  opacity = 0.5,
  speed = 1200,
  ...rest
}: Props) {
  return (
    <span
      className={styles.wrapper}
      style={{
        opacity,
        // @ts-ignore
        "--speed": `${speed}ms`,
        width: size,
        height: size,
      }}
      {...rest}
    >
      <Loader color={color} size={size} />
    </span>
  )
}
