defmodule Piupiu.Account do
  use Piupiu.Web, :model

  @derive {Poison.Encoder, only: [:id, :username, :domain, :name, :description]}

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
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> registration_changeset(params)
    |> cast(params, [:domain, :name, :description])
    |> unique_constraint(:username, name: :accounts_username_domain_index, message: "This username is already registered")
    |> unique_constraint(:username, name: :accounts_username_null_domain_index, message: "This username is already registered")
  end
end
