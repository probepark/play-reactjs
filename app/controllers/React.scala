package controllers

import javax.inject._

import akka.actor._
import akka.pattern.ask
import js.RendererActor._
import play.api.libs.concurrent.Execution.Implicits._
import play.api.mvc._

import scala.concurrent.duration._

@Singleton
class React @Inject()(@Named("js-renderer") renderer: ActorRef) extends Controller {

  def index = Action.async { implicit request =>
    val js = "React.renderToString(React.createElement(App));"

    implicit val timeout = akka.util.Timeout(10.seconds)
    (renderer ? ToRender(js)).map {
      case RenderedData(data) => Ok(views.html.main("React on Play") {
        play.twirl.api.Html(data)
      })
      case _ => InternalServerError("invalid response from js engine")
    }.recover {
      case _ => InternalServerError("Missing or invalid response from js engine")
    }
  }

}
