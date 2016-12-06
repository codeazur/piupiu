defmodule Piupiu.User do
  use Piupiu.Web, :model

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  @derive {Phoenix.Param, key: :id}
  @derive {Poison.Encoder, only: [:id, :email, :account]}

  @email_regex ~r/^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/i

  schema "users" do
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true

    belongs_to :account, Piupiu.Account

    has_many :applications, Piupiu.Application

    timestamps()
  end

  def registration_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :password])
    |> validate_required([:email], message: "Please enter your email address")
    |> validate_required([:password], message: "Please enter your password")
    |> validate_length(:email, max: 254, message: "This email address is invalid")
    |> validate_format(:email, @email_regex, message: "This email address is invalid")
    |> validate_length(:password, min: 6, message: "Your password must be at least %{count} characters long")
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> registration_changeset(params)
    |> cast(params, [:encrypted_password, :account_id])
    |> unique_constraint(:email, message: "This email address is already registered")
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
