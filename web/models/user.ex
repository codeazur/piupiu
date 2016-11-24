defmodule Piupiu.User do
  use Piupiu.Web, :model

  schema "users" do
    field :nick_name, :string
    field :display_name, :string
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @derive {Poison.Encoder, only: [:id, :nick_name, :display_name, :email]}

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:nick_name, :display_name, :email, :encrypted_password, :password])
    |> validate_required([:nick_name, :email, :password])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:nick_name, message: "Nickname already taken")
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end
