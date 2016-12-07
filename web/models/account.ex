defmodule Piupiu.Account do
  use Piupiu.Web, :model

  @primary_key {:id, :binary_id, autogenerate: true}

  @derive {Phoenix.Param, key: :id}
  @derive {Poison.Encoder, only: [:id, :username, :domain, :name, :description]}

  @username_regex ~r/^[A-Z0-9_]+$/i

  schema "accounts" do
    field :username, :string
    field :domain, :string
    field :name, :string
    field :description, :string

    has_one :user, Piupiu.User

    timestamps()
  end

  def registration_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username])
    |> validate_required([:username], message: "Please enter your username")
    |> validate_format(:username, @username_regex, message: "Your username can only contain letters, numbers and underscores")
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> registration_changeset(params)
    |> cast(params, [:domain, :name, :description])
    |> unique_constraint(:username, name: :accounts_username_domain_index, message: "This username is already registered")
    |> unique_constraint(:username, name: :accounts_username_null_domain_index, message: "This username is already registered")
  end
end
