defmodule Piupiu.Session do
  alias Piupiu.{Repo, User}

  def authenticate(%{"email" => nil, "password" => _password}), do: :error

  def authenticate(%{"email" => _email, "password" => nil}), do: :error

  def authenticate(%{"email" => email, "password" => password}) do
    user = Repo.get_by(User, email: String.downcase(email))
    case check_password(user, password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> false
      _ -> Comeonin.Bcrypt.checkpw(password, user.encrypted_password)
    end
  end
end
