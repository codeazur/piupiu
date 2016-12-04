defmodule Piupiu.Application do
  use Piupiu.Web, :model

  schema "applications" do
    field :name, :string
    field :url, :string
    
    belongs_to :user, Piupiu.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :url])
    |> validate_required([:name, :url])
  end
end
