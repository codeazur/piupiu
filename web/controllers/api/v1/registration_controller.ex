defmodule Piupiu.RegistrationController  do
  use Piupiu.Web, :controller

  alias Piupiu.{Repo, Registration, User, Account}

  plug :scrub_params, "registration" when action in [:create]

  def create(conn, %{"registration" => params}) do
    changeset = Registration.changeset(%Registration{}, params)

    if changeset.valid? do

      multi = 
        Multi.new
        |> Multi.insert(:user, User.changeset(%User{}, params))
        |> Multi.insert(:account, Account.changeset(%Account{}, params))
        |> Multi.run(:index, fn changes ->
             Repo.update Ecto.Changeset.change(changes.user, account_id: changes.account.id)
           end)

      case Repo.transaction(multi) do
        {:ok, %{index: user}} ->
          {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :token)

          conn
          |> put_status(:created)
          |> render(Piupiu.SessionView, "show.json", jwt: jwt, user: user |> Repo.preload(:account))

        {:error, _operation, repo_changeset, _changes} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render(Piupiu.RegistrationView, "error.json", changeset: copy_errors(repo_changeset, changeset), error_type: "constraint")
      end

    else

      conn
      |> put_status(:unprocessable_entity)
      |> render(Piupiu.RegistrationView, "error.json", changeset: changeset, error_type: "validation")

    end
  end

  defp copy_errors(from, to) do
    Enum.reduce from.errors, to, fn {field, {msg, _}}, acc ->
      Ecto.Changeset.add_error(acc, field, msg)
    end
  end
end
