import {
  DM_Sans,
  Flow_Circular,
  Inter,
  JetBrains_Mono,
  Karla,
  Rubik,
} from "next/font/google"

export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
})

export const flow = Flow_Circular({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-flow",
})

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})
