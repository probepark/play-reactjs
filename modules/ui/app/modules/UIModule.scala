package modules

import com.google.inject.AbstractModule
import js.RendererActor
import play.api.libs.concurrent.AkkaGuiceSupport

class UIModule extends AbstractModule with AkkaGuiceSupport {
  def configure = {
    bindActor[RendererActor]("js-renderer")
  }
}
