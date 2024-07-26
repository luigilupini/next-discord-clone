import {
  Flow_Circular,
  Inter,
  JetBrains_Mono,
  Karla,
  Rubik,
} from "next/font/google"
import localFont from "next/font/local"

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts
export const local = localFont({
  src: [
    {
      path: "./rubik-variable.ttf",
    },
  ],
})

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
