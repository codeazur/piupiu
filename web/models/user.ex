defmodule Piupiu.User do
  use Piupiu.Web, :model

  @derive {Poison.Encoder, only: [:id, :nick_name, :display_name, :email]}

  schema "users" do
    field :nick_name, :string
    field :display_name, :string
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:nick_name, :display_name, :email, :encrypted_password, :password])
    |> validate_required([:nick_name, :email, :password])
    |> validate_length(:email, max: 254, message: "Please enter a valid email address")
    |> validate_format(:email, ~r/^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/i, message: "Please enter a valid email address")
    |> validate_length(:password, min: 6, message: "The password must be at least 6 characters long")
    |> validate_confirmation(:password, message: "The password does not match")
    |> unique_constraint(:email, message: "This email address is already registered")
    |> unique_constraint(:nick_name, message: "This username is already registered")
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
