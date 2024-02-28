"use client"

import { Center } from "@/components/layout/flex"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RootError() {
  return (
    <Center className="h-screen" as="main">
      <Card className="relative bg-destructive px-4 text-destructive-foreground">
        <CardHeader>
          <CardTitle className="text-4xl">Oops!</CardTitle>
          <CardDescription className="text-destructive-foreground">
            That was not supposed to happen
          </CardDescription>
        </CardHeader>
        <CardContent className="text-xs">
          <p>We seem to be having some trouble</p>
          <p>Please try again later . . .</p>
        </CardContent>
      </Card>
    </Center>
  )
}
