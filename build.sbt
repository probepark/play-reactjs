name := """play-reactjs"""

version in ThisBuild := "1.0-SNAPSHOT"


lazy val app = (project in file("."))
  .enablePlugins(PlayScala)
  .dependsOn(ui)
  .aggregate(ui)

lazy val ui = (project in file("modules/ui"))
  .enablePlugins(PlayScala)

scalaVersion in ThisBuild := "2.11.7"

libraryDependencies in ThisBuild ++= Seq(
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.0-RC1" % Test
)

// resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator in ThisBuild := InjectedRoutesGenerator
