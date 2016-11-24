defmodule Piupiu.CurrentUserController do
  use Piupiu.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Piupiu.SessionController

  def show(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end
end
