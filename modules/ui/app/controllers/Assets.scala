package controllers.ui

import controllers.Assets.Asset
import play.api.http.LazyHttpErrorHandler

class Assets extends controllers.AssetsBuilder(LazyHttpErrorHandler) {
  def js(path: String, file: Asset) = versioned(path, file)
}
