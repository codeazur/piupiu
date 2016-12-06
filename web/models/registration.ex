defmodule Piupiu.Registration do
  use Piupiu.Web, :model

  alias Piupiu.{User, Account}

  embedded_schema do
    field :email
    field :password
    field :username
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :password, :username])
    |> User.registration_changeset(params)
    |> Account.registration_changeset(params)
  end
end
