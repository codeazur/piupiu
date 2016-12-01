defmodule Piupiu.RegistrationController  do
  use Piupiu.Web, :controller

  alias Piupiu.{Repo, User}

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    if changeset.valid? do

      case Repo.insert(changeset) do
        {:ok, user} ->
          {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :token)

          conn
          |> put_status(:created)
          |> render(Piupiu.SessionView, "show.json", jwt: jwt, user: user)

        {:error, changeset} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render(Piupiu.RegistrationView, "error.json", changeset: changeset, error_type: "constraint")
      end

    else

      conn
      |> put_status(:unprocessable_entity)
      |> render(Piupiu.RegistrationView, "error.json", changeset: changeset, error_type: "validation")

    end
  end
end
