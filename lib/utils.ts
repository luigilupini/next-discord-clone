import clsx, { ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export const initials = (fullName: string) => {
  const names = fullName.split(" ")
  if (names.length < 2) {
    // Not enough initials thus...
    return fullName.slice(0, 2).toUpperCase() // return first 2 letters of the name
  }
  names.splice(2)
  return names.map((word) => word.charAt(0).toUpperCase()).join("")
}

export const delay = (time: number, callback?: () => void): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
      if (callback) callback()
    }, time)
  })
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}

const FORMAT_OPTIONS = {
  tiny: "MM/dd", // 01/22
  short: "P", // 01/01/2020
  medium: "PP", // Jan 1, 2020
  long: "PPPP", // Wednesday, January 1st, 2020
  fullDate: "yyyy-MM-dd", // 2020-01-01
  fullDateTime: "yyyy-MM-dd HH:mm:ss", // 2020-01-01 00:00:00
  // Add more formats as needed
}

type FormatOption =
  | "tiny"
  | "short"
  | "medium"
  | "long"
  | "fullDate"
  | "fullDateTime"

export const formatDate = (
  date: Date | undefined,
  formatOption: FormatOption = "short",
) => {
  if (!date) return ""
  // Use the format option if it exists, otherwise use the provided string
  const formatStr = FORMAT_OPTIONS[formatOption] || formatOption
  return format(new Date(date), formatStr)
}

export const formatDateToLocal = (
  dateStr: string | null | undefined,
  locale: string = "en-US",
) => {
  if (!dateStr || dateStr.length <= 0) {
    return ""
  }
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}
