defmodule Piupiu.PageController do
  use Piupiu.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
